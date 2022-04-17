import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponseSwaggerData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ default: '' })
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
