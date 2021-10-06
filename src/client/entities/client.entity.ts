import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Client extends CoreEntity {
  @Column()
  @ApiProperty({ example: 'John', description: 'The name of the Client' })
  @IsString()
  name: string;

  @Column({
    type: 'int',
    unique: true,
  })
  @ApiProperty({ example: 11111111, description: 'The id of the Client' })
  @IsInt()
  nationalId: number;

  @Column()
  @ApiProperty({ example: 'Doe', description: 'The last name of the Client' })
  @IsString()
  lastName: string;

  @Column()
  @ApiProperty({ example: 130005, description: 'The zip code of the Client' })
  @IsInt()
  zipCode: number;

  @Column()
  @ApiProperty({ example: 'Rome', description: 'The address of the Client' })
  @IsString()
  address: string;

  @ApiProperty({
    type: Invoice,
    isArray: true,
    description: 'The invoices of the Client',
  })
  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices: Invoice[];
}
