import { ApiProperty } from '@nestjs/swagger';
import { IFileData } from '../domain';
export class FileDto implements IFileData {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public teamId: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public contentType: string;
  @ApiProperty()
  public path: string;
  @ApiProperty()
  public url: string;
  @ApiProperty()
  readonly createdAt?: Date;
  @ApiProperty()
  readonly updatedAt?: Date;
}
