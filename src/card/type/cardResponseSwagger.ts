import { CardResponseSwaggerData } from 'src/card/type/cardResponseSwaggerData';
import { ApiProperty } from '@nestjs/swagger';

export class CardResponseSwagger {
  @ApiProperty()
  card: CardResponseSwaggerData;
}
