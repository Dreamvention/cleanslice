import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class NumberModel {
  @ApiProperty({ example: 0 })
  public readonly data: number;

  @ApiProperty({ example: true })
  public readonly success: boolean;
}

export const ApiNumberResponse = () => {
  return applyDecorators(
    ApiExtraModels(NumberModel),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(NumberModel) },
          {
            properties: {
              data: {
                type: 'number',
              },
            },
          },
        ],
      },
    }),
  );
};
