import { ApiProperty } from '@nestjs/swagger';

export class UserResponseSwaggerData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  token: string;
}
