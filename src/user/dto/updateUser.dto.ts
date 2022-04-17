import { IsEmail, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @MaxLength(16)
  @ApiProperty()
  readonly username: string;

  @IsEmail()
  @MaxLength(32)
  @ApiProperty()
  readonly email: string;

  @Length(3, 24)
  @ApiProperty()
  readonly password: string;
}
