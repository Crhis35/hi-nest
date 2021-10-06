import { Injectable } from '@nestjs/common';
import { CreateClientInput, CreateClientOutput } from './dto/create-client.dto';
import { DeleteClientOutput } from './dto/delete-client.dto';
import { GetClientInput, GetClientOutput } from './dto/get-client.dto';
import { GetClientsInput, GetClientsOutput } from './dto/get-clients.dto';
import { UpdateClienOutput, UpdateClientInput } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly clients: ClientRepository) {}
  async create(
    createClientInput: CreateClientInput,
  ): Promise<CreateClientOutput> {
    try {
      const client = await this.clients.find({
        nationalId: createClientInput.nationalId,
      });

      if (client.length > 0) {
        throw new Error('Client already exists');
      }

      const newClient = await this.clients.create(createClientInput);
      this.clients.save(newClient);
      return {
        client: newClient,
        message: 'Client created successfully',
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async findClientById({ id }: GetClientInput): Promise<GetClientOutput> {
    try {
      const client = await this.clients.findByNationalIdOrId(id);
      if (!client) {
        throw new Error('Client not found');
      }

      return {
        client: client,
        message: 'Client found successfully',
        ok: true,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
  async update(
    id: string,
    updateClientInput: UpdateClientInput,
  ): Promise<UpdateClienOutput> {
    try {
      const client = await this.clients.findByNationalIdOrId(id);
      if (!client) {
        throw new Error('Client not found');
      }
      await this.clients.save([
        {
          id: client.id,
          ...updateClientInput,
        },
      ]);

      return {
        message: 'Client updated successfully',
        ok: true,
        client: {
          ...client,
          ...updateClientInput,
        },
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }

  async getAllClients({
    page,
    limit,
  }: GetClientsInput): Promise<GetClientsOutput> {
    try {
      const [clients, totalResults] = await this.clients.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        ok: true,
        items: clients,
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

  async delete(id: string): Promise<DeleteClientOutput> {
    try {
      const client = await this.clients.findByNationalIdOrId(id);

      if (!client) {
        throw new Error('Client not found');
      }

      await this.clients.delete(client.id);

      return {
        message: 'Client deleted successfully',
        ok: true,
      };
    } catch (error) {
      return {
        message: error.message,
        ok: false,
      };
    }
  }
}
