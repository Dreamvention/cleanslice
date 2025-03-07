import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty()
  public readonly id: string;
}

export class IdModel {
  @ApiProperty()
  public readonly data: IdDto;

  @ApiProperty({ example: true })
  public readonly success: boolean;
}

export const ApiIdResponse = () => {
  return applyDecorators(
    ApiExtraModels(IdModel, IdDto),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(IdModel) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(IdDto),
              },
            },
          },
        ],
      },
    }),
  );
};
