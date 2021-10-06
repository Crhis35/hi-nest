import { ApiProperty, PickType } from '@nestjs/swagger';
import { Package } from '../entities/package.entity';

export class CreatePackageInput extends PickType(Package, ['name', 'price']) {
  @ApiProperty({
    description: 'Track id',
  })
  trackId: string;
}
