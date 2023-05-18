#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RDSInstance } from '../lib/RDSInstance';
import { Aws, Construct } from '@aws-cdk/core';

const deploymentStage = 'cdk-sls-dev'

const defaultEnv: cdk.Environment = {
    account: Aws.ACCOUNT_ID,
    region: 'ap-southeast-1'
}

const app = new cdk.App();

class CdkStack extends Construct {
    constructor(scope:Construct, id: string, env: cdk.Environment) {
        super(scope, id);
        new RDSInstance(this, 'AuroraServerlessCdk', {env}, deploymentStage);
    }
}

new CdkStack(app, deploymentStage, defaultEnv);
