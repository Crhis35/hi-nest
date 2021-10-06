import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Package } from '../entities/package.entity';

export class GetPackageOutput extends CoreOutput {
  @ApiProperty({
    description: 'Package',
    type: Package,
  })
  package?: Package;
}
