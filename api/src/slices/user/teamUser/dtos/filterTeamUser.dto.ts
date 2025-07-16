import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { ITeamUserFilter } from "../domain";

export class FilterTeamUserDto implements ITeamUserFilter {
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    search: string;

    @ApiProperty({ type: String, isArray: true, required: false })
    @IsOptional()
    teamIds: string[];

    @ApiProperty({ type: String, isArray: true, required: false })
    @IsOptional()
    userIds: string[];

    @ApiProperty({ type: Number, required: false })
    @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : value))
    @IsOptional()
    perPage? = 20;
}
