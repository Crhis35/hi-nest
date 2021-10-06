import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateInvoiceInput,
  CreateInvoiceOutput,
} from './dto/create-invoice.dto';
import {
  DeleteInvoiceInput,
  DeleteInvoiceOutput,
} from './dto/delete-invoice.dto';
import { GetInvoiceOutput } from './dto/get-invoice.dto';
import { GetInvoicesInput, GetInvoicesOutput } from './dto/get-invoices.dto';
import { InvoicesService } from './invoices.service';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Get('/:id')
  @ApiOperation({
    summary: 'Get a single invoice',
  })
  @ApiResponse({
    status: 200,
    description: 'Get a single invoice',
    type: GetInvoiceOutput,
  })
  async getInvoice(@Param('id') id: string): Promise<GetInvoiceOutput> {
    return await this.invoicesService.getInvoiceById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the invoices ',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all the invoices',
    type: GetInvoicesOutput,
  })
  async getAllInvoices(
    @Query() getInvoicesInput: GetInvoicesInput,
  ): Promise<GetInvoicesOutput> {
    return await this.invoicesService.getInvoices(getInvoicesInput);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new invoice',
  })
  @ApiResponse({
    status: 200,
    description: 'Create a new invoice',
    type: CreateInvoiceOutput,
  })
  async createInvoice(
    @Body() createInvoiceInput: CreateInvoiceInput,
  ): Promise<CreateInvoiceOutput> {
    return await this.invoicesService.createInvoice(createInvoiceInput);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a single invoice',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete a single invoice',
    type: DeleteInvoiceOutput,
  })
  async deleteInvoice(
    @Param('id') deleteInvoiceInput: DeleteInvoiceInput,
  ): Promise<DeleteInvoiceOutput> {
    return await this.invoicesService.deleteInvoice(deleteInvoiceInput);
  }
}
