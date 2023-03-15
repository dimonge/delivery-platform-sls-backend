import * as cdk from "@aws-cdk/core"

export type EnvironmentVariable = string;

export type PROCESS_ENV = "ENV"

export const getEnv = (value: EnvironmentVariable) => {
  return process.env[value];
}

export const getRemovalPolicy = (stage: EnvironmentVariable = "dev") => {
  return isLocal(stage) ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN;
}

export const isLocal = (stage: EnvironmentVariable = "dev") => {
  return stage === "dev"
}