
import * as cdk from "@aws-cdk/core"

import {AppDBCluster} from "./helper/construct"

export interface DBStackProps extends cdk.StackProps {
  dbName: string;
  stage?: string;
}
export default class DBStack extends cdk.Stack {
  public readonly coreDb: any; 
  //public readonly dynamodb: any

  constructor(scope: cdk.Construct, id: string, props?: DBStackProps) {
    super(scope, id, props)

    // Aurora database for ACID transaction
    this.coreDb = new AppDBCluster(this, props?.stage+"-AppCoreCluster", {
      defaultDatabaseName: props?.dbName,
      account: props?.env?.account,
      region: props?.env?.region,
      stage: props?.stage
    })

    // DynamoDb for real-time data like asset tracking, events and ecommerce shop integrations.
    /*
    this.addOutputs({
      ClusterIdentifier: this.coreDb.cluster.clusterIdentifier
    })
    
    new CfnOutput(this, "secret-arn", {     
      SecretArn: this.coreDb.cluster.secret?.secretArn,
    })
    */
  }
}