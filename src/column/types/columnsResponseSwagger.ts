import { ColumnResponseSwaggerData } from 'src/column/types/columnResponseSwaggerData';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnsResponseSwagger {
  @ApiProperty({ type: [ColumnResponseSwaggerData] })
  columns: ColumnResponseSwaggerData[];
}
