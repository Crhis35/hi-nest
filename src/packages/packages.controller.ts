import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrackInput, CreateTrackOutput } from './dto/create-track.dto';
import { DeleteTrackOutput } from './dto/delete-tracks.dto';
import { GetPackageOutput } from './dto/get-package.dto';
import { GetPackagesInput, GetPackagesOutput } from './dto/get-packages.dto';
import { GetTracksInput, GetTracksOutput } from './dto/get-tracks.dto';
import { PackagesService } from './packages.service';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all the packages ',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all the packages',
    type: GetPackagesOutput,
  })
  async getAllPackages(
    @Query() getPackagesInput: GetPackagesInput,
  ): Promise<GetPackagesOutput> {
    return await this.packagesService.getAllPackages(getPackagesInput);
  }

  @Get('/tracks')
  @ApiOperation({
    summary: 'Get all tracks',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all tracks',
    type: GetTracksOutput,
  })
  async getAllTracks(
    @Query() getTracksInput: GetTracksInput,
  ): Promise<GetTracksOutput> {
    console.log(getTracksInput);
    return this.packagesService.getAllTracks(getTracksInput);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a package by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get a package by id',
    type: GetPackageOutput,
  })
  async getPackageById(@Param('id') id: string): Promise<GetPackageOutput> {
    return await this.packagesService.getPackageById(id);
  }

  @Post('/tracks')
  @ApiOperation({
    summary: 'Create a track',
  })
  @ApiResponse({
    status: 200,
    description: 'Create a track',
    type: CreateTrackOutput,
  })
  async createTrack(
    @Body() createTrackInput: CreateTrackInput,
  ): Promise<CreateTrackOutput> {
    return this.packagesService.createTrack(createTrackInput);
  }
  @Delete('/tracks/:id')
  @ApiOperation({
    summary: 'Delete a track',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete a track',
    type: DeleteTrackOutput,
  })
  async deleteTrack(@Param('id') id: string): Promise<DeleteTrackOutput> {
    return this.packagesService.deleteTrack(id);
  }
}
