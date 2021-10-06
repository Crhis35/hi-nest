import { ApiProperty } from '@nestjs/swagger';
import { PaginationInput, PaginationOutput } from 'src/common/dto/pagination';
import { Invoice } from '../entities/invoice.entity';

export class GetInvoicesOutput extends PaginationOutput {
  @ApiProperty({
    type: Invoice,
    isArray: true,
  })
  items?: Invoice[];
}

export class GetInvoicesInput extends PaginationInput {}
