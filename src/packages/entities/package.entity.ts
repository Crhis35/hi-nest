import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Track } from './track.entity';

@Entity()
export class Package extends CoreEntity {
  @Column()
  @ApiProperty({ example: 'Laptod', description: 'The name of the Package' })
  @IsString()
  name: string;

  @Column({
    type: 'float',
  })
  @ApiProperty({ example: 99.9, description: 'The amount of the Package' })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: () => Invoice,
    description: 'The invoice of the Package',
  })
  @ManyToOne(() => Invoice, (invoice) => invoice.packages, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  invoice?: Invoice;

  @OneToOne(() => Track, { onDelete: 'SET NULL' })
  @JoinColumn()
  track: Track;
}
