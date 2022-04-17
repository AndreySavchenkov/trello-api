import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(16)
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 24)
  readonly password: string;
}
