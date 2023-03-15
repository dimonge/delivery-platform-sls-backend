# Mo Services

# Modeliver backend

## Stack
- AuthStack
- DBStack

### Custom construct
- SQLTable construct support only aurora postgresql

Start the ec2 jump box instance to redirect the database traffic to localhost
  - ssh -N -L 5432:{hostname}:5432 ubuntu@{ec2-public-ip} -i {key} -v
  - ssh -N -L 5432:xxxxx-cluster.cluster-xxxxxxx.eu-west-1.rds.amazonaws.com:5432 ec2-user@ec2-34-xxx-xx-xx.eu-west-1.compute.amazonaws.com -i prisma.pem -v

  arn:aws:cloudformation:eu-west-1:xxxxx:stack/genesis-platform/xxxxxxx
  arn:aws:secretsmanager:eu-west-1:xxxxx:secret:dev-Secret-odOc6p
# Getting Started with Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

Start by installing the dependencies.

```bash
$ yarn install
```

## Commands

### `yarn run start`

Starts the local Lambda development environment.

### `yarn run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `yarn run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `yarn run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `yarn run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack) or [post on our forums](https://discourse.serverless-stack.com).

## Architecture

### Tables

1. Tasks 
  - type Task
  - input (CreateTaskInput, UpdateTaskInput) 
  - query (listTasksByCompanyId, listTasksAssignedToFleetByCompanyIdAndType, )
  - mutation (createTask, updateTask, deleteTask)

2. Company
  - type Company
  - query ()
  - mutation (createPickupAddress, updatePickupAddress, deletePickupAddress)

3. PickupAddress
  - type PickupAddress
  - input (UpdatePickupAddressInput, CreatePickupAddressInput)
  - query (listPickupAddressesByCompanyId)
  - mutation ()

4. Customer
  - type Customer
  - query ()
  - mutation ()

5. FleetPrice
  - type FleetPrice
  - query ()
  - mutation ()

https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html

- Graphql schema & data type 
  - Universal graph type and schema
- Create db migration
  - Create the db migration from graph schema type and validation type.

1. Genql  --> Query builder for auto-complete and validation for graphql queries.
2. Nexus  --> Code-first approach for building Graphql schemas & type safety in your API layer.
3. Prisma --> open-source database toolkit that guarantees type safety and simplifies working with relational databases. 
4. Apollo-server-micro --> HTTP server for GraphQL API


1. UI (Genql)
2. API ---> Nexus or AppSync
3. DB --> Prisma
4. AppSync Server --> Apollo-server-micro


PG
https://www.postgresql.org/docs/13/datatype.html
https://github.com/jeremydaly/data-api-client
https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
https://www.prisma.io/docs/concepts/components/prisma-schema
https://nexusjs.org/docs/api/scalar-type#example-of-datetime-scalar


To read https://dev.to/prisma/deploy-a-graphql-api-with-prisma-aws-appsync-aurora-serverless-cdk-ln4

## Use to keep credentials during development
- https://github.com/99designs/aws-vault

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template




Service 2.0

- Ports (APIs)
  - Graphql APIs
    - Command API
    - Query API

- Model
  - user + (cognito)
  - company
  - customer
  - tasks
  - pickupAddress


- infrastructure
- Application
- 


## Stack
- Command Stacks
  - PartnerCommandStack
    - AppSync
    - Lambda ---> Producers Connects to EventStore Stack
- Query Stack
  - PartnerQueryStack
    - AppSync
    - Lambda 
- Event stacks
  - DivineStoreStack
    - Kinesis
    - S3
    - Lambda (Consumers - up to 20)
- 