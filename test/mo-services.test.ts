import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as MoServices from '../lib/mo-services-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MoServices.MoServicesStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
