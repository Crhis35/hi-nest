import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 } from 'uuid';

export class CoreEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string = v4();

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
