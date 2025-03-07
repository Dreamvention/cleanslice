import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ITeamsFilter } from '../domain';
import { ApiProperty } from '@nestjs/swagger';

export class TeamsFilterDto implements ITeamsFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  ids?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  perPage?: number;
}
