import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  readonly email: string;

  @IsNotEmpty()
  @Length(3, 24)
  readonly password: string;
}
