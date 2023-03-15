import * as cdk from "@aws-cdk/core"
import * as kinesis from "@aws-cdk/aws-kinesis"
import * as lambda from "@aws-cdk/aws-lambda"
import * as lambdaEventSources from "@aws-cdk/aws-lambda-event-sources"
import * as iam from "@aws-cdk/aws-iam"
interface EventStoreStackProps extends cdk.StackProps {
  commandDataSource: lambda.Function;
  commandFnRole: iam.IGrantable
}
export default class EventStoreStack extends cdk.Stack {
  public readonly eventStream: kinesis.Stream;

  constructor(scope: cdk.Construct, id: string, props: EventStoreStackProps) {
    super(scope, id, props)

    // kinesis
    this.eventStream = new kinesis.Stream(this, "divineEventStore", {
      streamName: "divine-event-stream",
      shardCount: 2,
      //retentionPeriod: cdk.Duration.hours(96)
    })

    // datasource is lambda
    this.eventStream.grantWrite(props.commandFnRole)
    //props.commandDataSource.addEventSource( new this.eventStore.)
    const eventSource = new lambdaEventSources.KinesisEventSource(this.eventStream, {
      startingPosition: lambda.StartingPosition.TRIM_HORIZON
    })

    
    // consumers are 
    // 1. storage lambda
    // 2. payment lambda
    // 3. routing lambda
    // 4. invoice lambda
    // 5. driver app asset tracking lambda


  }
}