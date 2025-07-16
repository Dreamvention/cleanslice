// @scope:api
// @slice:ai/completion
// @layer:presentation
// @type:module

import { Module } from '@nestjs/common';
import { CompletionController } from './completion.controller';

@Module({
  controllers: [CompletionController],
})
export class CompletionModule {}
