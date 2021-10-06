import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Client } from '../entities/client.entity';
import { CreateClientInput } from './create-client.dto';

export class UpdateClientInput extends PartialType(
  OmitType(CreateClientInput, ['nationalId']),
) {}

export class UpdateClienOutput extends CoreOutput {
  @ApiProperty({
    type: Client,
    required: false,
  })
  client?: Client;
}
