import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { Signal } from "../entities/signal.entity";

export class TradingViewLogInput extends EntityHelper {

    @ApiProperty({ example: 'User Signal Token'})
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty({ example: "any type"})
    @IsNotEmpty()
    meta: any;
}


export class CreateTradingViewLog extends EntityHelper {
    @ApiProperty({ example: "any type"})
    @IsNotEmpty()
    meta: any;

    @ApiProperty({ type: User })
    @Validate(IsExist, ['User', 'id'], {
      message: 'User Does not exist',
    })
    user: User;

    @ApiProperty({ type: Signal })
    @Validate(IsExist, ['Signal', 'id'], {
      message: 'Signal Does not exist',
    })
    signal: Signal;
}