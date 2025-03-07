import { Get, Post, Delete, Body, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './domain';
import { UploadFileDto, FilterFileDto, FileDto, CreateFileDto, SignedUrlDto } from './dtos';
import { ApiListResponse, ApiSingleResponse, ApiSuccessResponse } from '#core';
import { TeamsController, Team } from '#users/teams';

@TeamsController('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ description: 'Upload a File', operationId: 'uploadFile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async upload(@Team() team: any, @UploadedFile() file: Express.Multer.File) {
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
