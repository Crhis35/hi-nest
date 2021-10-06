import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceRepository } from './repositories/invoice.repository';
import { ClientRepository } from 'src/client/repositories/client.repository';
import { Client } from 'src/client/entities/client.entity';
import { PackageRepository } from 'src/packages/repositories/package.repository';
import { TrackRepository } from 'src/packages/repositories/track.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceRepository,
      PackageRepository,
      ClientRepository,
      TrackRepository,
      Client,
    ]),
  ],
  providers: [InvoicesService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
