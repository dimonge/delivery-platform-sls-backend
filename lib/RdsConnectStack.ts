import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"

interface RdsConnectStackProps extends cdk.StackProps {
  vpc: any;
  privateSg: ec2.SecurityGroup;
}

export class RdsConnect extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: RdsConnectStackProps) {
    super(scope, id, props)
    const ami = new ec2.LookupMachineImage({
      name: "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*",
      filters: { "virtualization-type": ["hvm"] },
      owners: [props?.env?.account || ""]
    })

    const publicSg = new ec2.SecurityGroup(this, "public-sg", {
      vpc: props?.vpc,
      securityGroupName: "pubic-sg"
    })

    publicSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "allow SSH access"
    )

    props?.privateSg.addIngressRule(
      publicSg,
      ec2.Port.tcp(5432),
      "allow Aurora Serverless Postgres access"
    )

    new ec2.Instance(this, "jump-box", {
      vpc: props?.vpc,
      securityGroup: publicSg,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.genericLinux({
        [props?.env?.region || ""]: ami.getImage(this).imageId,
      }),
      keyName: this.node.tryGetContext("keyName")
    })
  }   
}
