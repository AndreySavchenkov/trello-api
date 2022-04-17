import { ColumnResponseSwaggerData } from 'src/column/types/columnResponseSwaggerData';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponseSwagger {
  @ApiProperty()
  column: ColumnResponseSwaggerData;
}
