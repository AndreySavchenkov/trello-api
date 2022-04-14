import { Request } from 'express';
import { ColumnEntity } from 'src/column/column.entity';

export interface ExpressRequestColumnInterface extends Request {
  column?: ColumnEntity;
}
