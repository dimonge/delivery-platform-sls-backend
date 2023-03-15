#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import DBStack from '../lib/DBStack';
import InternalApiStack from '../lib/InternalApiStack';
import { RdsConnect } from '../lib/RdsConnectStack';
import PartnerCommandApi from '../lib/PartnerCommandApi';
import EventStoreStack from '../lib/EventStoreStack';

const dbName = "ModeliverAppDB"

const app = new cdk.App();
const stage = process.env.CDK_RESOURCE_STAGE

console.log("stage: ", stage)

const dbStack = new DBStack(app, "db-stack", {
  dbName,
  stage,
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION, 
  },
})

new InternalApiStack(app, "internal-api-stack", {
  cluster: dbStack?.coreDb.cluster,
  dbName,
  stage,
  vpc: dbStack?.coreDb.vpc,
  privateSg: dbStack?.coreDb.privateSg,
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION, 
  },
})

const partnerCommandApi = new PartnerCommandApi(app, "partner-command-api-stack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})

new EventStoreStack(app, "event-store-stack", {
  commandDataSource: partnerCommandApi.commandFn,
  commandFnRole: partnerCommandApi.commandFnRole,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
/*new RdsConnect(app, "rds-connect-stack", {
  vpc: dbStack?.coreDb.vpc,
  privateSg: dbStack?.coreDb.privateSg,
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION, 
  },
})*/
  //  const authStack = new AuthStack(app, "auth-stack", { })
  