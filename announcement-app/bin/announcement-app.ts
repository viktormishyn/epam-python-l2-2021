#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AnnouncementAppPipelineStack } from "../lib/announcement-app-pipeline-stack";

const app = new cdk.App();
new AnnouncementAppPipelineStack(app, "AnnouncementAppStack");
