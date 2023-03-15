import Client from "data-api-client"
import {PrismaClient } from "@prisma/client"
import {SecretsManager } from "aws-sdk"

type SECRET_STRING = {
  username: string;
  password: string;
  host: string;
  port: string;
  dbname: string;
}

const sm = new SecretsManager()

let db: PrismaClient;

export const getDB = async () => {
  if (db) return db;

  const dbUrl = await sm.getSecretValue({
    SecretId: process.env.SECRET_ID || '',
  }).promise();

  const secretString: SECRET_STRING = JSON.parse(dbUrl.SecretString ||'{}');

  const url = `postgresql://${secretString.username}:${secretString.password}@${secretString.host}/${secretString.dbname}?connection_limit=1`

  db = new PrismaClient({
    datasources: {db: {url}},
  })

  return db
}

const dbClient:any = Client({ 
  secretArn: process.env.SECRET_ARN as string,
  resourceArn: process.env.CLUSTER_ARN as string,
  database: process.env.DB_NAME,
})

export type DBClientType = PrismaClient;

export default dbClient