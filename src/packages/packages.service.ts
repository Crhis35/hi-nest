import { Injectable } from '@nestjs/common';
import { CreateTrackInput, CreateTrackOutput } from './dto/create-track.dto';
import { DeleteTrackOutput } from './dto/delete-tracks.dto';
import { GetPackageOutput } from './dto/get-package.dto';
import { GetPackagesInput, GetPackagesOutput } from './dto/get-packages.dto';
import { GetTracksInput, GetTracksOutput } from './dto/get-tracks.dto';
import { PackageRepository } from './repositories/package.repository';
import { TrackRepository } from './repositories/track.repository';

@Injectable()
export class PackagesService {
  constructor(
    private readonly packages: PackageRepository,
    private readonly tracks: TrackRepository,
  ) {}

  async getAllPackages({
    limit,
    page,
  }: GetPackagesInput): Promise<GetPackagesOutput> {
    try {
      const [packages, totalResults] = await this.packages.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        ok: true,
        items: packages,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async getPackageById(id: string): Promise<GetPackageOutput> {
    try {
      const pck = await this.packages.findOne(
        { id },
        { relations: ['invoice'] },
      );

      if (!pck) {
        return {
          message: 'Package not found',
          ok: false,
        };
      }

      return {
        ok: true,
        package: pck,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
  async getAllTracks({
    limit,
    page,
  }: GetTracksInput): Promise<GetTracksOutput> {
    try {
      const [tracks, totalResults] = await this.tracks.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        ok: true,
        items: tracks,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async createTrack(
    createTrackInput: CreateTrackInput,
  ): Promise<CreateTrackOutput> {
    try {
      await this.tracks.save(this.tracks.create(createTrackInput));
      return {
        ok: true,
        message: 'Track created',
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async deleteTrack(id: string): Promise<DeleteTrackOutput> {
    try {
      const track = await this.tracks.findOne({ id });
      if (!track) {
        throw new Error('Track not found');
      }

      await this.tracks.delete(track.id);

      return {
        ok: true,
        message: 'Track deleted',
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
}
