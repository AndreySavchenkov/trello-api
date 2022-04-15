import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(16)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  readonly email: string;

  @IsNotEmpty()
  @Length(3, 24)
  readonly password: string;
}
