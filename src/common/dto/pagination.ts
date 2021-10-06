import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CoreOutput } from './output.dto';

export class PaginationOutput extends CoreOutput {
  @ApiProperty({
    description: 'Total pages of pagination',
    required: false,
  })
  totalPages?: number;
  @ApiProperty({
    description: 'Total results of pagination',
    required: false,
  })
  totalResults?: number;
}

export class PaginationInput {
  @ApiProperty({
    required: false,
    default: 1,
  })
  @IsInt()
  page?: number;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @IsInt()
  limit?: number;
}
