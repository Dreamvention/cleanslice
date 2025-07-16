import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { IFilterTeam } from '#user/team/domain';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterTeamDto implements IFilterTeam {
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
  @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : value))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : value))
  perPage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;
}
