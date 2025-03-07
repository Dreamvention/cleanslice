import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class SuccessModel {
  @ApiProperty({ example: true })
  public readonly success: boolean;
}

export const ApiSuccessResponse = () => {
  return applyDecorators(
    ApiExtraModels(SuccessModel),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [{ $ref: getSchemaPath(SuccessModel) }],
      },
    }),
  );
};
