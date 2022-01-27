import { CfnOutput, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AnnouncementAppStack } from "./announcement-app-stack";

/**
 * Deployable unit of web service app
 */
export class AnnouncementAppStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new AnnouncementAppStack(this, "AnnouncementApp");

    // Expose AnnouncementAppStack's output one level higher
    this.urlOutput = service.urlOutput;
  }
}
