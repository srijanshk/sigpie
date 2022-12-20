import { ApiProperty } from '@nestjs/swagger';

export class ForgotInput {
  @ApiProperty({ example: 'hash' })
  hash: string;

  @ApiProperty({ example: 'id' })
  userId: number;
}
