import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Client } from '../entities/client.entity';

export class GetClientInput {
  @ApiProperty({
    description: 'Client id',
  })
  @IsNotEmpty()
  id: string;
}

export class GetClientOutput extends CoreOutput {
  @ApiProperty({
    type: Client,
    required: false,
  })
  client?: Client;
}
