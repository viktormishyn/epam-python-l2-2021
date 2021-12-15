#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AnnouncementAppStack } from '../lib/announcement-app-stack';

const app = new cdk.App();
new AnnouncementAppStack(app, 'AnnouncementAppStack');
