import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientInput, CreateClientOutput } from './dto/create-client.dto';
import { DeleteClientOutput } from './dto/delete-client.dto';
import { GetClientInput, GetClientOutput } from './dto/get-client.dto';
import { GetClientsInput, GetClientsOutput } from './dto/get-clients.dto';
import { UpdateClienOutput, UpdateClientInput } from './dto/update-client.dto';

@ApiTags('Clients')
@Controller('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clienstsService: ClientsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all the clients client',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all the clients',
    type: GetClientsOutput,
  })
  async getAllClients(
    @Query() getClientsInput: GetClientsInput,
  ): Promise<GetClientsOutput> {
    return this.clienstsService.getAllClients(getClientsInput);
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
  })
  async create(
    @Body() createClientInput: CreateClientInput,
  ): Promise<CreateClientOutput> {
    return this.clienstsService.create(createClientInput);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find client by id or national id' })
  @ApiResponse({
    status: 200,
    description: 'The found client',
  })
  async findOne(
    @Param() getClientInput: GetClientInput,
  ): Promise<GetClientOutput> {
    return this.clienstsService.findClientById(getClientInput);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientInput: UpdateClientInput,
  ): Promise<UpdateClienOutput> {
    return this.clienstsService.update(id, updateClientInput);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<DeleteClientOutput> {
    return this.clienstsService.delete(id);
  }
}
