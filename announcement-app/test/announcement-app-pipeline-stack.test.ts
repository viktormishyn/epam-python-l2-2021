import * as cdk from "aws-cdk-lib";
import { Capture, Template } from "aws-cdk-lib/assertions";
import { AnnouncementAppPipelineStack } from "../lib/announcement-app-pipeline-stack";

const app = new cdk.App();

describe("Pipeline created with correct definition", () => {
  const stack = new AnnouncementAppPipelineStack(app, "PipelineStack");
  const template = Template.fromStack(stack);
  const stagesCapture = new Capture();

  it("Pipeline Created", () => {
    template.hasResourceProperties("AWS::CodePipeline::Pipeline", {
      Stages: stagesCapture,
    });
  });

  it("Pipeline Has Correct Stages", () => {
    // Arrange
    const expected_stages = [
      "Source",
      "Build",
      "UpdatePipeline",
      "Assets",
      "Dev",
      "Prod",
    ];

    const stages_objects: Array<{ Action: any; Name: any }> =
      stagesCapture._captured[0];
    const actual_stages = stages_objects.map((i) => i.Name);

    // Assert
    expect(actual_stages.length).toEqual(6);
    expect(actual_stages).toEqual(expected_stages);
  });
});
