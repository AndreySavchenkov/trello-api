import { CardResponseSwaggerData } from 'src/card/type/cardResponseSwaggerData';
import { ApiProperty } from '@nestjs/swagger';

export class CardsResponseSwagger {
  @ApiProperty({ type: [CardResponseSwaggerData] })
  cards: CardResponseSwaggerData[];
}
