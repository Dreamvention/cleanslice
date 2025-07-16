import { Get, Post, Delete, Body, Param, UseInterceptors, UploadedFile, Query, Controller } from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './domain';
import { UploadFileDto, FilterFileDto, FileDto, CreateFileDto, SignedUrlDto } from './dtos';
import { ApiListResponse, ApiSingleResponse, ApiSuccessResponse } from '#core';
import { Team } from '../user/team/team.decorator';

@Controller('files')
@ApiTags('files')
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ description: 'Upload a file', operationId: 'uploadFile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiSuccessResponse()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Team() team: any) {
    return await this.filesService.uploadFile({
      teamId: team.id,
      dataBuffer: file.buffer,
      contentType: file.mimetype,
      name: file.originalname,
    });
  }

  @ApiOperation({ description: 'Get Signed Url', operationId: 'getSignedUrl' })
  @ApiSingleResponse(SignedUrlDto)
  @Get('signedUrl')
  async signedUrl(@Team() team: any, @Query('path') path: string, @Query('contentType') contentType: string) {
    const teamId = team.id;
    return await this.filesService.getSignedUrl(teamId, path, contentType);
  }

  @ApiOperation({ description: 'Create Files', operationId: 'createFile' })
  @ApiSingleResponse(FileDto)
  @Post()
  async create(@Team() team: any, @Body() query: CreateFileDto) {
    query.teamId = team.id;
    return await this.filesService.createFile(query);
  }

  @ApiOperation({ description: 'Get all Files', operationId: 'getFiles' })
  @ApiListResponse(FileDto)
  @Get()
  async getFiles(@Team() team: any, @Query() query?: FilterFileDto) {
    query.teamId = team.id;
    return await this.filesService.getFiles(query);
  }

  @ApiOperation({ description: 'Get all Files', operationId: 'getFile' })
  @ApiSingleResponse(FileDto)
  @Get(':id')
  async getFile(@Param('id') id: string) {
    return await this.filesService.getFile(id);
  }

  @ApiOperation({ description: 'Delete File', operationId: 'deleteFile' })
  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.filesService.deleteFile(id);
  }
}
