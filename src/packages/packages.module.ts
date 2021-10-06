import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { PackageRepository } from './repositories/package.repository';
import { TrackRepository } from './repositories/track.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PackageRepository, TrackRepository])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
