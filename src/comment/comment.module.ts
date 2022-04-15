import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/card.entity';
import { Module } from '@nestjs/common';
import { CommentEntity } from 'src/comment/comment.entity';
import { CommentController } from 'src/comment/comment.controller';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
