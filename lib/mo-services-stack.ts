import * as cdk from '@aws-cdk/core';

import DBStack from "./DBStack";
import InternalApiStack from "./InternalApiStack";

interface MoServicesStackProps extends cdk.StackProps {     
  stage?: string;
}
export class MoServicesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: MoServicesStackProps) {
    super(scope, id, props);

    const dbName = "ModeliverAppDB"
  
    const dbStack = new DBStack(this, "db-stack", {
      dbName
    })
  
  //  const authStack = new AuthStack(app, "auth-stack", { })
    new InternalApiStack(this, "internal-api-stack", /*{ userPool: authStack.auth.cognitoUserPool }*/ {
      cluster: dbStack?.coreDb.cluster,
      dbName,
      vpc: dbStack?.coreDb.vpc,
      privateSg: dbStack?.coreDb.privateSg
    })
  }
}
