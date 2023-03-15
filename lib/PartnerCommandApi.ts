import * as cdk from "@aws-cdk/core"
import * as appSync from "@aws-cdk/aws-appsync"
import * as lambda from "@aws-cdk/aws-lambda"
import * as iam from "@aws-cdk/aws-iam"

export default class PartnerCommandApi extends cdk.Stack {
  public readonly partnerCommandApi: appSync.GraphqlApi;
  public readonly commandFn: lambda.Function;
  public readonly commandFnRole: iam.IGrantable;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    this.partnerCommandApi = new appSync.GraphqlApi(this, "partnerCommandApi", {
      name: "partner-command-api",
      schema: appSync.Schema.fromAsset("graphql/partnerCommandApiSchema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appSync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        }
      },
      xrayEnabled: true
    })

    this.commandFn = new lambda.Function(this, "partnerCommandFn", {
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(10),
      memorySize: 1024,
      code: new lambda.AssetCode("command-fns"),
      handler: "event/index.handler",
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",        
      },
      tracing: lambda.Tracing.ACTIVE
    })

    this.commandFnRole = new iam.Role(this, "commandFn-Role", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      description: "Role to grant permission to write to EventStore kinesis stream",      
    })

/*    this.commandFnRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [this.commandFn.functionArn],
      actions: ["*"],      
    }))*/

    const partnerCommandDs = this.partnerCommandApi
      .addLambdaDataSource("partnersCommandDs", this.commandFn)

    
    for (const {typeName, fieldName} of resolvers) {
      partnerCommandDs.createResolver({typeName, fieldName})
    }

    new cdk.CfnOutput(this, "PartnerCommandApiUrl", {
      value: this.partnerCommandApi.graphqlUrl
    })

    new cdk.CfnOutput(this, "PartnerCommandApiKey", {
      value: this.partnerCommandApi.apiKey || ""
    })

    new cdk.CfnOutput(this, "PartnerCommandApiRegion", {
      value: this.region
    })
  }
}

const resolvers = [
  { typeName: "Mutation", fieldName: "createTask" },
  {typeName: "Mutation", fieldName: "updateTask"},
  {typeName: "Mutation", fieldName: "deleteTask" }
]