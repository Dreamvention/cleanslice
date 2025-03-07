import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class MetaListDto {
  @ApiProperty({ example: 1 })
  total: number;
  @ApiProperty({ example: 1 })
  lastPage: number;
  @ApiProperty({ example: 1 })
  currentPage: number;
  @ApiProperty({ example: 20 })
  perPage: number;
  @ApiProperty({ example: null })
  prev: number | null;
  @ApiProperty({ example: null })
  next: number | null;
}

export class PaginationModel<T> {
  public readonly data: T[];
  @ApiProperty()
  public readonly meta: MetaListDto;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PaginationModel, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationModel) },
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
