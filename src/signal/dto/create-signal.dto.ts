import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsIn,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSignalDataInput {
  @ApiProperty({ example: 'ticker type' })
  @IsNotEmpty()
  @IsString()
  ticker: string;

  @ApiProperty({ example: 'Open or Close' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['open', 'close'])
  actionType: string;

  @ApiProperty({ example: 'Order Type' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['buy', 'sell'])
  orderType: string;

  @ApiProperty({ example: 'stop loss at' })
  @IsNotEmpty()
  @IsNumber()
  stopLoss: number;

  @ApiProperty({ example: 'take profit at' })
  @IsNotEmpty()
  @IsNumber()
  takeProfit: number;

  @ApiProperty({ example: 'Contains other data type' })
  @IsJSON()
  @IsOptional()
  meta?: any;
}

export class CreateSignalDto {
  @ApiProperty({ example: 'BTUSD' })
  @IsNotEmpty()
  @IsString()
  signalName: string;

  @ApiProperty({ example: 'This is a signal for getting bitcoin signal data' })
  @IsOptional()
  @IsString()
  signalDescription?: string;

  @ApiProperty({ example: 'Price of signal Integer Value' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'private, public or followers' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['private', 'public', 'followers'])
  privacy: string;

  @ApiProperty({ example: 12 })
  signalDataId: number;
}

export class CreateSignalPayload extends IntersectionType(
  CreateSignalDto,
  CreateSignalDataInput,
) {}
