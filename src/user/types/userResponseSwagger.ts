import { ApiProperty } from '@nestjs/swagger';
import { UserResponseSwaggerData } from 'src/user/types/userResponseSwaggerData';

export class UserResponseSwagger {
  @ApiProperty()
  user: UserResponseSwaggerData;
}
