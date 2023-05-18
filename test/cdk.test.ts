import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RDSInstance from '../lib/RDSInstance';

test('Empty Stack', () => {
    const app = new cdk.App();
    const deploymentStage = 'cdk-sls-dev'
    const defaultEnv: cdk.Environment = {
      account: process.env.account,
      region: process.env.region
  }
    // WHEN
    const stack = new RDSInstance.RDSInstance(app, 'MyTestStack', { env: {
      region: defaultEnv.region,
      account: defaultEnv.account
    }},deploymentStage);
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
