import { OmitType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Track } from '../entities/track.entity';

export class CreateTrackInput extends OmitType(Track, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class CreateTrackOutput extends CoreOutput {}
