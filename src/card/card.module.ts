import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { UserEntity } from 'src/user/user.entity';
import { CardEntity } from 'src/card/card.entity';
import { CardController } from 'src/card/card.controller';
import { CardService } from 'src/card/card.service';
import { CommentEntity } from 'src/comment/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColumnEntity,
      UserEntity,
      CardEntity,
      CommentEntity,
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
