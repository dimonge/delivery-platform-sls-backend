import * as cdk from "@aws-cdk/core"
import * as appSync from "@aws-cdk/aws-appsync";
import * as iam from "@aws-cdk/aws-iam"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as lambda from "@aws-cdk/aws-lambda"

export interface InternalApiStackProps extends cdk.StackProps {
  cluster?: any;
  dbName?: string;
  vpc?: any;
  privateSg?: any;
  stage?: string;
}

export default class InternalApiStack extends cdk.Stack {
  public readonly api: appSync.GraphqlApi;
  constructor(scope: cdk.Construct, id: string, props?: InternalApiStackProps) {
    super(scope, id, props)

    const cluster = props?.cluster;
    const vpc = props?.vpc;
    const privateSg = props?.privateSg;

    // create graphql api
   this.api = new appSync.GraphqlApi(this, props?.stage+"-AppGraphqlApi", {   
      name: "modeliver-appsync-api",
      schema: appSync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appSync.AuthorizationType.API_KEY,            
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          },

        },

      },
      xrayEnabled: false
    }) 

    // grant datasource access to the cluster
    const postFn = new lambda.Function(this, props?.stage +"-postRdsFn", {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.ISOLATED },
      runtime: lambda.Runtime.NODEJS_14_X,
      securityGroups: [privateSg],
      timeout: cdk.Duration.seconds(10),
      memorySize: 1024,      
      code: new lambda.AssetCode('lambda-fns'),
      handler: 'datasource/index.handler',
      environment: {
        CLUSTER_ARN: cluster.clusterArn,
        SECRET_ARN: cluster.secret?.secretArn || '',
        SECRET_ID: cluster.secret?.secretArn || '',
        DB_NAME: props?.dbName || '',
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
      }      
  })


      /*
      dataSources: {
        companiesDS: "src/datasource/companies.index",
        tasksDS: "src/datasource/tasks.index",
        pickupAddressesDS: "src/datasource/pickupAddresses.index"
      },
      resolvers: {
        // Tasks 
        "Query listTasksByCompanyId": "tasksDS",
        "Query listTasksAssignedToFleetByCompanyIdAndType": "tasksDS",
        "Mutation createTask": "tasksDS",
        "Mutation updateTask": "tasksDS",
        "Mutation deleteTask": "tasksDS",

        "Mutation createPickupAddress": "pickupAddressesDS",
        "Mutation updatePickupAddress": "pickupAddressesDS",
        "Mutation deletePickupAddress": "pickupAddressesDS",

        "Query listPickupAddressesByCompanyId": "pickupAddressesDS"

      }*/

    postFn.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["secretsmanager:GetSecretValue"],
      resources: [cluster.secret?.secretArn || ""]
    }))

    //cluster.grantDataApiAccess(this.api.getFunction("tasksDS"))
/*
    datasources.forEach(ds => {
      //cluster.grantDataApiAccess(this.api.getFunction(ds))
      this.api.getFunction(ds)?.addToRolePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["secretsmanager:GetSecretValue"],
        resources: [cluster.secret?.secretArn || ""]
      }))

    })*/

    new ec2.InterfaceVpcEndpoint(this, props?.stage+"-secrets-manager", {
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
      vpc,
      privateDnsEnabled: true,
      subnets: { subnetType: ec2.SubnetType.ISOLATED},
      securityGroups: [privateSg]
    })

    const lambdaDs = this.api.addLambdaDataSource("lambdaDatasource", postFn)

    for (const {typeName, fieldName} of resolvers) {
      lambdaDs.createResolver({typeName, fieldName})
    }
    // CFN Outputs
    new cdk.CfnOutput(this, 'AppSyncAPIURL', {
      value: this.api.graphqlUrl,
    })
    new cdk.CfnOutput(this, 'AppSyncAPIKey', {
      value: this.api.apiKey || '',
    })

    new cdk.CfnOutput(this, "Region", {
      value: this.region
    })
  }
}
/**
 * resolvers: {
        // Tasks 
        "Query listTasksByCompanyId": "tasksDS",
        "Query listTasksAssignedToFleetByCompanyIdAndType": "tasksDS",
        "Mutation createTask": "tasksDS",
        "Mutation updateTask": "tasksDS",
        "Mutation deleteTask": "tasksDS",

        "Mutation createPickupAddress": "pickupAddressesDS",
        "Mutation updatePickupAddress": "pickupAddressesDS",
        "Mutation deletePickupAddress": "pickupAddressesDS",

        "Query listPickupAddressesByCompanyId": "pickupAddressesDS"

      }*/

const resolvers = [
  {typeName: "Query", fieldName: "listTasksByCompanyId"},
  {typeName: "Query", fieldName: "listTasksAssignedToFleetByCompanyIdAndType"},
  {typeName: "Mutation", fieldName: "createTask"},
  {typeName: "Mutation", fieldName: "updateTask"},
  {typeName: "Mutation", fieldName: "deleteTask"},
]