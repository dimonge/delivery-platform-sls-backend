import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as rds from "@aws-cdk/aws-rds"
import * as lambda from "@aws-cdk/aws-lambda"
import { getRemovalPolicy, isLocal } from "../../utils"

export interface AppDBClusterConstructProps  {
  deletionProtection?: boolean;
  defaultDatabaseName?: string;
  region?: string;
  account?: string;
  stage?: string;
}

export default class AppDBClusterConstruct extends cdk.Construct {

  public readonly cluster: rds.ServerlessCluster
  public readonly postFn: lambda.IFunction
  public readonly vpc: ec2.Vpc
  public readonly privateSg: ec2.SecurityGroup;
  
  constructor(scope: cdk.Construct, id: string, props?: AppDBClusterConstructProps) {
    super(scope, id)
    const removalPolicy = getRemovalPolicy(props?.stage)
    // create vpc for database
    this.vpc = new ec2.Vpc(this, "ModeliverDBVpc", {
      cidr: '10.0.0.0/20',
      natGateways: 0,
      maxAzs: 2,
      enableDnsHostnames: true,      
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: 22,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          cidrMask: 22,
          name: "private",
          subnetType: ec2.SubnetType.ISOLATED
        }
      ]
    })
    this.vpc.applyRemovalPolicy(removalPolicy)

    this.privateSg = new ec2.SecurityGroup(this, "private-db-sg", {
      vpc: this.vpc,
      securityGroupName: "private-sg"
    })
    
    this.privateSg.addIngressRule(
      this.privateSg,
      ec2.Port.allTraffic(),
      "allow internal SG access"
    )
    this.privateSg.applyRemovalPolicy(removalPolicy)

    if (isLocal(props?.stage)) {
      
      const machineImage = ec2.MachineImage.fromSsmParameter(
        "/aws/service/canonical/ubuntu/server/focal/stable/current/amd64/hvm/ebs-gp2/ami-id",
        ec2.OperatingSystemType.LINUX as any
      )
      
      /*const ami = new ec2.LookupMachineImage({
        name: machineImage.getImage(this).imageId,
        filters: { "virtualization-type": ["hvm"] },
        owners: [props?.account || ""]
      })*/

      const publicSg = new ec2.SecurityGroup(this, "public-db-sg", {
        vpc: this.vpc,
        securityGroupName: "pubic-sg"
      })
  
      publicSg.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        "allow SSH access"
      )
      publicSg.applyRemovalPolicy(removalPolicy)
      this.privateSg.addIngressRule(
        publicSg,
        ec2.Port.tcp(5432),
        "allow Aurora Serverless Postgres access"
      )
  
      const dbJumpInstance = new ec2.Instance(this, "db-jump-box", {
        vpc: this.vpc,
        securityGroup: publicSg,
        vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T2,
          ec2.InstanceSize.MICRO
        ),
        machineImage: ec2.MachineImage.genericLinux({
          [props?.region || ""]: machineImage.getImage(this).imageId,
        }),
        keyName: this.node.tryGetContext("keyName"),      
      })
      dbJumpInstance.applyRemovalPolicy(removalPolicy)
    }

    const subnetGroup = new rds.SubnetGroup(this, "rds-db-subnet-group", {
      vpc: this.vpc,
      subnetGroupName: "db-subnet-group",
      vpcSubnets: { subnetType: ec2.SubnetType.ISOLATED},
      removalPolicy: removalPolicy,
      description: "An all private subnets group for the DB"
    })

    // Aurora Serverless
    this.cluster = new rds.ServerlessCluster(this, "ModeliverAppDBCluster", {
      vpc: this.vpc,
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      parameterGroup: rds
        .ParameterGroup
        .fromParameterGroupName(this, "ParameterGroup", "default.aurora-postgresql10"),
      scaling: {
        autoPause: cdk.Duration.seconds(0),
        minCapacity: rds.AuroraCapacityUnit.ACU_8,
        maxCapacity: rds.AuroraCapacityUnit.ACU_32
      },
      enableDataApi: true,
      vpcSubnets: this.vpc,
      subnetGroup,
      securityGroups: [this.privateSg],
      removalPolicy: removalPolicy,
      ...props,
      deletionProtection: props?.deletionProtection || true 
    })

  }
}