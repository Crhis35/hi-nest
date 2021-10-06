import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Track extends CoreEntity {
  @Column()
  @ApiProperty({ example: 'Cartagena', description: 'The origin of the Track' })
  @IsString()
  origin: string;

  @Column()
  @ApiProperty({ example: 'New York', description: 'The destiny of the Track' })
  @IsString()
  destiny: string;

  @Column({
    type: 'float',
  })
  @ApiProperty({ example: 3500.0, description: 'The cost of the Track' })
  @IsNumber()
  cost: number;
}
