import { ColumnEntity } from 'src/column/column.entity';

export type ColumnType = Omit<ColumnEntity, 'updateTimestamp'>;
