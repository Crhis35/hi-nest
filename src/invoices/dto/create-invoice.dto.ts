import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreatePackageInput } from 'src/packages/dto/create-package.dto';
import { Invoice } from '../entities/invoice.entity';

export class CreateInvoiceInput extends PickType(Invoice, ['date']) {
  @ApiProperty({
    description: 'The packages to be included in the invoice',
    type: CreatePackageInput,
    isArray: true,
  })
  @IsArray()
  items: CreatePackageInput[];
  @ApiProperty({
    description: 'The Client of the Invoice',
  })
  @IsString()
  clientId: string;
}

export class CreateInvoiceOutput extends CoreOutput {
  @ApiProperty({
    type: Invoice,
    nullable: true,
  })
  invoice?: Invoice;
}
