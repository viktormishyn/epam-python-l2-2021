import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as AnnouncementApp from "../lib/announcement-app-stack";

const app = new cdk.App();

describe("Template created with correct definition", () => {
  const stack = new AnnouncementApp.AnnouncementAppStack(app, "TestStack");
  const template = Template.fromStack(stack);

  it("DynamoDB table Created", () => {
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
