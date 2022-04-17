import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { Repository } from 'typeorm';
import { CardEntity } from 'src/card/card.entity';
import { CreateCommentDto } from 'src/comment/dto/createComment.dto';
import { CommentResponseInterface } from 'src/comment/types/commentResponseInterface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async findAllComments(cardId: number): Promise<any> {
    const card = await this.cardRepository.findOne(cardId);

    if (!card) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }

    const allCommentsForCard = await this.cardRepository
      .createQueryBuilder('card')
      .where('card.id = :cardId', { cardId })
      .leftJoinAndSelect('card.comments', 'comments')
      .getMany();

    return allCommentsForCard;
  }

  async createComment(
    currentUserId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const card = await this.cardRepository.findOne(cardId);

    if (!card) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    const comment = new CommentEntity();
    comment.authorId = currentUserId;
    Object.assign(comment, createCommentDto);

    comment.card = card;

    return await this.commentRepository.save(comment);
  }

  async findCommentById(commentId: number): Promise<any> {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  async deleteComment(currentUserId: number, commentId: number): Promise<any> {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== comment.authorId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    await this.commentRepository.delete(commentId);
    return 'This comment deleted successful';
  }

  async updateCommentById(
    currentUserId: number,
    commentId: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<any> {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== comment.authorId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    return { comment };
  }
}
