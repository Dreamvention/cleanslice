import { Module } from '@nestjs/common';
// import { ModelsController } from './models.controller';
// import { IModelsGateway } from './domain/gateways';
// import { ModelsGateway } from './data/gateways';
// import { ModelsService } from './domain/services';
// import { ChatMapper, MessageMapper } from './data/mappers';
// import { OpenAIRepository } from './data/repositories';
import { DynamoModule } from './dynamo/dynamo.module';
import { BedrockModule } from './bedrock/bedrock.module';
import { LambdaModule } from './lambda/lambda.module';
import { OpensearchModule } from './opensearch/opensearch.module';
import { S3Module } from './s3/s3.module';
import { CognitoModule } from './cognito/cognito.module';

@Module({
  imports: [DynamoModule, BedrockModule, OpensearchModule, S3Module, LambdaModule, CognitoModule],
  //   providers: [
  //     { provide: IModelsGateway, useClass: ModelsGateway },
  //     ModelsService,
  //     // ModelsGateway,
  //     // MessageMapper,
  //   ],
  //   controllers: [ModelsController],
  exports: [DynamoModule, BedrockModule, OpensearchModule, S3Module, LambdaModule, CognitoModule],
})
export class AwsModule {}
