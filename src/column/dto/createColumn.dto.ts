import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @ApiProperty({ default: '' })
  @MaxLength(500)
  readonly description?: string;
}
