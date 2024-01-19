import { Construct } from 'constructs';
import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { IamPolicy } from '@cdktf/provider-aws/lib/iam-policy';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import config from './config';

export class IamLambda {
  public static init(scope: Construct) {
    const assumeRole = new DataAwsIamPolicyDocument(scope, 'assume_role', {
      statement: [
        {
          effect: 'Allow',
          principals: [
            {
              type: 'Service',
              identifiers: ['lambda.amazonaws.com'],
            },
          ],
          actions: ['sts:AssumeRole'],
        },
      ],
    });

    const lambdaPolicy = new DataAwsIamPolicyDocument(scope, 'lambda-policy', {
      statement: [
        {
          effect: 'Allow',
          actions: ['s3:*'],
          resources: ['*'],
        },
        {
          effect: 'Allow',
          actions: [
            'ec2:DescribeNetworkInterfaces',
            'ec2:CreateNetworkInterface',
            'ec2:DeleteNetworkInterface',
            'ec2:DescribeInstances',
            'ec2:AttachNetworkInterface',
          ],
          resources: ['*'],
        },
        {
          effect: 'Allow',
          actions: ['cognito-idp:*'],
          resources: ['*'],
        },
        {
          effect: 'Allow',
          actions: ['lambda:*'],
          resources: ['*'],
        },
        {
          effect: 'Allow',
          actions: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
            'dynamodb:CreateTable',
          ],
          resources: ['*'],
        },
        {
          effect: 'Allow',
          actions: ['rds:*', 's3:*'],
          resources: ['arn:aws:rds:*:*:db:*', 'arn:aws:rds:*:*:cluster:*', 'arn:aws:rds-db:*:*:dbuser:*/*'],
        },
      ],
    });

    const iamLambdaPolicy = new IamPolicy(scope, 'iam-lambda-policy', {
      name: `${process.env.npm_package_name}-${config.env}-iam-lambda-policy`,
      path: '/',
      policy: lambdaPolicy.json,
    });

    const iamForLambda = new IamRole(scope, 'iam-for-lambda', {
      name: `${process.env.npm_package_name}-${config.env}-function-role`,
      assumeRolePolicy: assumeRole.json,
      managedPolicyArns: ['arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole', iamLambdaPolicy.arn],
    });

    return {
      iamForLambda,
    };
  }
}
