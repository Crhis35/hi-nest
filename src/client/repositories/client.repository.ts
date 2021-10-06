import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async findByNationalIdOrId(clientId: string): Promise<Client | undefined> {
    const nationalId = Number(clientId);

    const client = await this.findOne(
      {
        ...(nationalId ? { nationalId } : { id: clientId }),
      },
      { relations: ['invoices'] },
    );

    return client;
  }
}
