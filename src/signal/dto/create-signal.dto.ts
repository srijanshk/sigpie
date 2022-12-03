import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { Status } from "src/statuses/entities/status.entity";
import { User } from "src/users/entities/user.entity";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { SignalData } from "../entities/signal-data.entity";

export class CreateSignalDataInput {
  @ApiProperty({ example: 'ticker type'})
  @IsNotEmpty()
  @IsString()
  ticker: string;

  @ApiProperty({ example: 'Open or Close'})
  @IsNotEmpty()
  @IsString()
  @IsIn(['open', 'close'])
  actionType: string;

  @ApiProperty({ example: 'Order Type'})
  @IsNotEmpty()
  @IsString()
  orderType: string;

  @ApiProperty({ example: 'stop loss at'})
  @IsNotEmpty()
  @IsNumber()
  stopLoss: number;

  @ApiProperty({ example: 'take profit at'})
  @IsNotEmpty()
  @IsNumber()
  takeProfit: number;

  @ApiProperty({ example: 'Contains other data type'})
  @IsJSON()
  meta: any;    
}

export class CreateSignalDto  {
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

    @ApiProperty({ type: User })
    @Validate(IsExist, ['User', 'id'], {
      message: 'User Does not exist',
    })
    owner: User;

    @ApiProperty({ type: Status })
    @Validate(IsExist, ['Status', 'id'], {
      message: 'statusNotExists',
    })
    status?: Status;

    @ApiProperty({ type: SignalData })
    @Type(() => CreateSignalDataInput)
    signalData: CreateSignalDataInput;

}

export class CreateSignalPayload extends IntersectionType(CreateSignalDto, CreateSignalDataInput) {

}