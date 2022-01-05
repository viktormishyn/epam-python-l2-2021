# Announcement App

Simple serverless app for publishing and retrieving announcements

## Tech Stack

- TypeScript
- Jest
- AWS CDK v2
- AWS SDK v2
- AWS Lambda, API Gateway, DynamoDB

## Documentation

[AnnouncementAppDiagram.html](https://viktormishyn.github.io/epam-python-l2-2021/announcement-app/AnnouncementAppDiagram.html)

## Setup

_Requirements_: **Node.js v14+**

1. Install AWS CLI:
   ```
   sudo apt install awscli
   ```
1. Configure aws credentials:
   ```
   aws configure
   ```
1. Install latest version of AWS CDK v2:
   ```
   sudo npm i -g aws-cdk
   ```
1. Bootstrap aws cdk environment (https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)
   ```
   export CDK_NEW_BOOTSTRAP=1
   npx cdk bootstrap aws://<ACCOUNT>/<REGION> --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
   ```
1. Install TypeScript compiler:
   ```
   sudo npm i -g typescript
   ```
1. Install npm packages:
   ```
   npm ci
   ```
1. Specify REPO, BRANCH and OAUTH constants in `lib/announcement-app-pipeline-stack.ts`

## Commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## CI/CD Pipeline

Self-mutating CI/CD Pipeline is defined in the application's infrastructure stack.  
Only one-time manual deployement is needed, after that github webhook will be added to the pipeline and it will run after every change in the specific repo's branch (also updating itself).
In order to deploy application for the first time, run commands:

- `npm run build`
- `cdk synth`
- `cdk deploy`

Pipeline consists of 6 stages:

1. Source
2. Build
3. UpdatePipeline
4. Assets
5. Dev\*
6. Prod\*\*

\*_Deployment to dev environment is validated via curl GET request to /getAnnouncements url_  
\*\*_Manual confirmation in AWS console is required in order to deploy to prod env_
