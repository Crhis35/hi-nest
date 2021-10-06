import { ApiProperty } from '@nestjs/swagger';
import { PaginationInput, PaginationOutput } from 'src/common/dto/pagination';
import { Client } from '../entities/client.entity';

export class GetClientsOutput extends PaginationOutput {
  @ApiProperty({
    type: Client,
    isArray: true,
    required: false,
  })
  items?: Client[];
}

export class GetClientsInput extends PaginationInput {}
