import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { IUsersFilter } from '../domain';
import { Transform } from 'class-transformer';

export class FilterUserDto implements IUsersFilter {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ type: String, isArray: true, required: false })
  @IsOptional()
  ids: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  public lastKey?: string;

  @ApiProperty({ type: Number, required: false })
  @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : value))
  @IsOptional()
  public perPage? = 20;
}
