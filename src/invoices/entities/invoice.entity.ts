import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Client } from 'src/client/entities/client.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Package } from 'src/packages/entities/package.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Invoice extends CoreEntity {
  @Column({ type: 'date' })
  @IsDate()
  @ApiProperty({
    description: 'Date of the Invoice',
    example: new Date(),
  })
  date: Date;

  @Column({
    type: 'float',
  })
  @ApiProperty({
    example: '1000',
    description: 'The total amount of the Invoice',
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    type: () => Client,
    description: 'The Client of the Invoice',
  })
  @ManyToOne(() => Client, (client) => client.invoices, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @ApiProperty({
    type: Package,
    description: 'The Packages of the Invoice',
    isArray: true,
  })
  @OneToMany(() => Package, (pac) => pac.invoice)
  packages: Package[];
}
