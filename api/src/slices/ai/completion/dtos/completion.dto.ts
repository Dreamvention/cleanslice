// @scope:api
// @slice:ai/completion
// @layer:presentation
// @type:dto

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CompletionDto {
  @ApiProperty({
    description: 'Array of messages for AI completion',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        role: { type: 'string' },
        parts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              text: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @IsArray()
  @IsOptional()
  messages?: {
    id: string;
    role: string;
    parts: { type: string; text: string }[];
  }[];
}
