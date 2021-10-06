import { ApiProperty } from '@nestjs/swagger';
import { PaginationInput, PaginationOutput } from 'src/common/dto/pagination';
import { Package } from '../entities/package.entity';

export class GetPackagesInput extends PaginationInput {}

export class GetPackagesOutput extends PaginationOutput {
  @ApiProperty({
    type: Package,
    isArray: true,
    required: false,
  })
  items?: Package[];
}
