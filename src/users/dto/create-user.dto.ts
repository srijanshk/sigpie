import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  provider?: string;

  @ApiProperty()
  socialId?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'id' })
  @IsOptional()
  photoId?: string;

  @ApiProperty({ example: 'id' })
  roleId: number;

  @ApiProperty({ example: 'id' })
  statusId?: number;

  @ApiProperty({ example: 'crypto hash' })
  hash?: string;
}
