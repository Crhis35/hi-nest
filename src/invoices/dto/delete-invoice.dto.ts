import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';

export class DeleteInvoiceInput {
  @ApiProperty({
    description: 'Invoice id',
  })
  id: string;
}
export class DeleteInvoiceOutput extends CoreOutput {}
