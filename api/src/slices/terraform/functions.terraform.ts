import { Construct } from 'constructs';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import config from './config';
import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { S3Object } from '@cdktf/provider-aws/lib/s3-object';
import { TerraformAsset, AssetType } from 'cdktf';
import * as path from 'path';

export class Lambda {
  public static init(scope: Construct, role: IamRole) {
    // Create unique S3 bucket that hosts Lambda executable
    const asset = new TerraformAsset(scope, 'lambda-asset', {
      path: path.resolve(__dirname, '../../../dist/'),
      type: AssetType.ARCHIVE,
    });
    const bucket = new S3Bucket(scope, 'bucket', {
      bucketPrefix: `${process.env.npm_package_name}-${config.env}-lambda-arhive`,
    });
    // Upload Lambda zip file to newly created S3 bucket
    const lambdaArchive = new S3Object(scope, 'lambda-archive', {
      bucket: bucket.bucket,
      key: `${asset.fileName}`,
      source: asset.path, // returns a posix path
    });

    const lambdaMain = new LambdaFunction(scope, 'lambda', {
      runtime: 'nodejs18.x',
      s3Bucket: bucket.bucket,
      s3Key: lambdaArchive.key,
      handler: 'dist/src/lambda.handler',
      functionName: `${process.env.npm_package_name}-${config.env}-function-main`,
      role: role.arn,
      environment: {
        variables: {
          DATABASE_URL: 'file:./dev.db',
        },
      },
    });

    return {
      lambdaMain,
    };
  }
}
