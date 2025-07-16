// @scope:api
// @slice:ai/completion
// @layer:presentation
// @type:dto

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CompletionDto {
  @ApiProperty({
    description: 'Array of messages for AI completion',
    example: [{ content: 'Hello' }, { content: 'How are you?' }],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
    },
    required: false,
  })
  @IsOptional()
  @IsArray()
  messages?: { content: string }[];

  @ApiProperty({
    description: 'Direct prompt for AI completion',
    example: 'Please return me the current amount of users!',
    required: false,
  })
  @IsOptional()
  @IsString()
  prompt?: string;
}
