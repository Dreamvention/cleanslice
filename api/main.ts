import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { IamLambda } from './slices/terraform/iam.terraform';
import { Lambda } from './slices/terraform/functions.terraform';
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, 'AWS', {
      region: 'us-east-1',
    });

    const { iamForLambda } = IamLambda.init(this);

    const { lambdaMain } = Lambda.init(this, iamForLambda);
    new TerraformOutput(this, 'lambda_arn', {
      value: lambdaMain.arn,
    });
  }
}

const app = new App();
new MyStack(app, 'aws-test-terraform');
app.synth();
