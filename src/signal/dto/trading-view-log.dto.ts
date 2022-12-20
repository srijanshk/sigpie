import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Signal } from "../entities/signal.entity";

export class TradingViewLogInput {

    @ApiProperty({ example: 'User Signal Token'})
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty({ example: "any type"})
    @IsNotEmpty()
    meta: any;
}


export class CreateTradingViewLogInput {
    @ApiProperty({ example: "any type"})
    @IsNotEmpty()
    meta: any;

    @ApiProperty({ example: "1" })
    // @Validate(IsExist, ['User', 'id'], {
    //   message: 'User Does not exist',
    // })
    userId: number;

    @ApiProperty({ example: "3" })
    // @Validate(IsExist, ['Signal', 'id'], {
    //   message: 'Signal Does not exist',
    // })
    signalId: number;
}