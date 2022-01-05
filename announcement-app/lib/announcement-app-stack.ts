import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class AnnouncementAppStack extends Stack {
  // url of API Gateway endpoint (for use in integration tests)
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB table definition
    const announcementsTable = new dynamodb.Table(this, "AnnouncementsTable", {
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.NUMBER },
      timeToLiveAttribute: "expirationTime",
    });

    // AnnouncementsApiLambda lambda definition and permissions
    const announcementsApiLambda = new lambda.Function(
      this,
      "AnnouncementsApiLambda",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset("lambda"),
        handler: "announcements-api-lambda.handler",
        environment: {
          ANNOUNCEMENT_APP_TABLE: announcementsTable.tableName,
        },
      }
    );
    announcementsTable.grantReadWriteData(announcementsApiLambda);

    // Create API Gateway with 2 paths
    const api = new apigateway.RestApi(this, "announcements-api");
    api.root
      .resourceForPath("/getAnnouncements")
      .addMethod(
        "GET",
        new apigateway.LambdaIntegration(announcementsApiLambda)
      );
    api.root
      .resourceForPath("/addAnnouncement")
      .addMethod(
        "POST",
        new apigateway.LambdaIntegration(announcementsApiLambda)
      );
    this.urlOutput = new CfnOutput(this, "announcementsApiUrl", {
      value: api.url,
    });
  }
}
