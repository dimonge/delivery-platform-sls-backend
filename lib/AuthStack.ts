import * as cdk from "@aws-cdk/core"
import { ServerlessCluster } from "@aws-cdk/aws-rds";
import { UserPool } from "@aws-cdk/aws-cognito";

export interface AuthStackProps extends cdk.StackProps {
  coreDb: ServerlessCluster
}

export default class AuthStack extends cdk.Stack {
  public readonly auth: UserPool;

  constructor(scope: cdk.Construct, id:string, props?: AuthStackProps) {
    super(scope, id, props)
/**
 * firstName
    lastName
    Email
    Lang
    PhotoUrl
    Address
    Phone
    CompanyId
    RoleId
 */

    this.auth = new UserPool(this, "userpool", {
      userPoolName: "partners-userpool"
    })
    
    //this.auth.attachPermissionsForAuthUsers([])
  }
}