import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientRepository } from './repositories/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientRepository])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
