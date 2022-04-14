import { CardEntity } from 'src/card/card.entity';

export type CardType = Omit<CardEntity, 'updateTimestamp'>;
