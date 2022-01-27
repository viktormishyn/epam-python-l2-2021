import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AnnouncementAppStack } from "../lib/announcement-app-stack";

const app = new cdk.App();

describe("Infrastructure template created with correct definition", () => {
  const stack = new AnnouncementAppStack(app, "InfrastructureStack");
  const template = Template.fromStack(stack);

  it("DynamoDB Table Created", () => {
    template.hasResourceProperties("AWS::DynamoDB::Table", {});
  });

  it("AnnouncementsApiLambda Created", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      Environment: {
        Variables: { ANNOUNCEMENT_APP_TABLE: {} },
      },
    });
  });

  it("API Gateway Created", () => {
    template.resourceCountIs("AWS::ApiGateway::Resource", 2);
    template.hasResourceProperties("AWS::ApiGateway::Resource", {
      PathPart: "getAnnouncements",
    });
    template.hasResourceProperties("AWS::ApiGateway::Resource", {
      PathPart: "addAnnouncement",
    });
  });
});
