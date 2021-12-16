import * as cdk from "aws-cdk-lib";
import { GitHubTrigger } from "aws-cdk-lib/aws-codepipeline-actions";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { AnnouncementAppStage } from "./announcement-app-stage";

const REPO = "viktormishyn/epam-python-l2-2021";
const BRANCH = "SERVERLESS_APP";

const oauth = cdk.SecretValue.secretsManager("github-token-cdk-pipeline");

/**
 * The stack that defines the application pipeline
 */
export class AnnouncementAppPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "AnnouncementAppPipeline",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.gitHub(REPO, BRANCH, {
          authentication: oauth,
          trigger: GitHubTrigger.WEBHOOK,
        }),
        installCommands: ["npm install -g aws-cdk"],
        commands: [
          "cd announcement-app",
          "npm ci",
          "npm run build",
          "npx cdk synth",
          "mv cdk.out ../",
        ],
      }),
    });

    // add dev stage
    const dev = new AnnouncementAppStage(this, "Dev");
    pipeline.addStage(dev);

    // add prod stage
    const prod = new AnnouncementAppStage(this, "Prod");
    pipeline.addStage(prod);
  }
}
