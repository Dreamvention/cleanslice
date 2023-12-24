import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { IamLambda } from './iam.terraform';
import { Lambda } from './functions.terraform';
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
  public async setup() {
    new AwsProvider(this, 'AWS', {
      region: 'us-east-1',
    });

    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });
    await promise;
    const { iamForLambda } = IamLambda.init(this);

    const { lambdaMain } = Lambda.init(this, iamForLambda);
    new TerraformOutput(this, 'lambda_arn', {
      value: lambdaMain.arn,
    });
  }
}

const app = new App();
const stack = new MyStack(app, 'aws-test-terraform');
stack.setup().then(() => {
  app.synth();
});
