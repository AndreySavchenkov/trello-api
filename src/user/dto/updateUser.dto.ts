import { IsEmail, Length, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(16)
  readonly username: string;

  @IsEmail()
  @MaxLength(32)
  readonly email: string;

  @Length(3, 24)
  readonly password: string;
}
