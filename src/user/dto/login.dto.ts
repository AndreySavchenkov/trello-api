import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @Length(3, 24)
  @ApiProperty()
  readonly password: string;
}
