import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Invoice } from '../entities/invoice.entity';

export class GetInvoiceOutput extends CoreOutput {
  @ApiProperty({
    type: Invoice,
  })
  invoice?: Invoice;
}

export class GetInvoiceInput {
  @ApiProperty({
    description: 'Invoice id',
  })
  id: string;
}
