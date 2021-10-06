import { ApiProperty } from '@nestjs/swagger';
import { PaginationInput, PaginationOutput } from 'src/common/dto/pagination';
import { Track } from '../entities/track.entity';

export class GetTracksInput extends PaginationInput {}

export class GetTracksOutput extends PaginationOutput {
  @ApiProperty({
    type: [Track],
    isArray: true,
    description: 'Tracks for a package',
  })
  items?: Track[];
}
