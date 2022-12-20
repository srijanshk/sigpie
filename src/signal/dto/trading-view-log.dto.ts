import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TradingViewLogInput {
  @ApiProperty({ example: 'User Signal Token' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ example: 'any type' })
  @IsNotEmpty()
  meta: any;
}

export class CreateTradingViewLogInput {
  @ApiProperty({ example: 'any type' })
  @IsNotEmpty()
  meta: any;

  @ApiProperty({ example: '1' })
  // @Validate(IsExist, ['User', 'id'], {
  //   message: 'User Does not exist',
  // })
  userId: number;

  @ApiProperty({ example: '3' })
  // @Validate(IsExist, ['Signal', 'id'], {
  //   message: 'Signal Does not exist',
  // })
  signalId: number;
}
