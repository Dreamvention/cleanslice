import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class MetaLastKeyDto {
  @ApiProperty({ type: String, required: false })
  public readonly lastKey?: string;
  @ApiProperty({ type: Boolean })
  public readonly isLastPage?: boolean;
}

export class LastKeyModel<T> {
  public readonly data: T[];
  @ApiProperty()
  public readonly meta: MetaLastKeyDto;
}

export const ApiLastKeyResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(LastKeyModel, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(LastKeyModel) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
