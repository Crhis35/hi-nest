import { ApiProperty, PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Client } from '../entities/client.entity';

export class CreateClientInput extends PickType(Client, [
  'name',
  'lastName',
  'nationalId',
  'zipCode',
  'address',
]) {}

export class CreateClientOutput extends CoreOutput {
  @ApiProperty({
    type: Client,
    required: false,
  })
  client?: Client;
}
