import { ApiProperty } from '@nestjs/swagger';

export class CoreOutput {
  @ApiProperty({
    description: 'The message of the request',
    example: 'Successfully created',
    required: false,
  })
  message?: string;

  @ApiProperty({
    description: 'The status of the request',
    example: true,
    required: false,
  })
  ok?: boolean;
}
