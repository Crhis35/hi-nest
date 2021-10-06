import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/client/repositories/client.repository';
import { Package } from 'src/packages/entities/package.entity';
import { PackageRepository } from 'src/packages/repositories/package.repository';
import { TrackRepository } from 'src/packages/repositories/track.repository';
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
import { InvoiceRepository } from './repositories/invoice.repository';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoices: InvoiceRepository,
    private readonly packages: PackageRepository,
    private readonly clients: ClientRepository,
    private readonly tracks: TrackRepository,
  ) {}
  async getInvoices({
    limit,
    page,
  }: GetInvoicesInput): Promise<GetInvoicesOutput> {
    try {
      const [invoices, totalResults] = await this.invoices.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        ok: true,
        items: invoices,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
  async getInvoiceById(id: string): Promise<GetInvoiceOutput> {
    try {
      const invoice = await this.invoices.findOne(
        { id },
        {
          relations: ['packages', 'client'],
        },
      );

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      return {
        ok: true,
        invoice,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async createInvoice({
    date,
    items,
    clientId,
  }: CreateInvoiceInput): Promise<CreateInvoiceOutput> {
    try {
      const client = await this.clients.findByNationalIdOrId(clientId);
      if (!client) {
        throw new Error('Client not found');
      }
      const packages: Package[] = [];
      let total = 0;

      for (const { trackId, ...item } of items) {
        const track = await this.tracks.findOne({ id: trackId });
        if (!track) {
          throw new Error('Track not found');
        }
        const pack = await this.packages.save(
          this.packages.create({ ...item, track }),
        );
        total += pack.price + track.cost;
        packages.push(pack);
      }
      const invoice = await this.invoices.save(
        this.invoices.create({
          date,
          total,
          packages,
          client,
        }),
      );

      return {
        ok: true,
        invoice,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
  async deleteInvoice({
    id,
  }: DeleteInvoiceInput): Promise<DeleteInvoiceOutput> {
    try {
      const invoice = await this.invoices.findOne({ id });

      if (!invoice) {
        throw new Error('Invoice not found');
      }
      await this.invoices.delete(invoice.id);

      return {
        ok: true,
        message: 'Invoice deleted',
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
}
