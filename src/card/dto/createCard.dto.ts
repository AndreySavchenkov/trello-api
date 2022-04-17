import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(1000)
  readonly body: string;

  @ApiProperty()
  @MaxLength(500)
  readonly description?: string;
}
