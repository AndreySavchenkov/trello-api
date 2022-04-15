import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CommentService } from 'src/comment/comment.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateCommentDto } from 'src/comment/dto/createComment.dto';
import { CommentResponseInterface } from 'src/comment/types/commentResponseInterface';
import { CommentsResponseInterface } from 'src/comment/types/commentsResponseInterface';

@Controller('/users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAllComments(
    @Param('cardId') cardId: number,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.findAllComments(cardId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createComment(
    @User('id') currentUserId: number,
    @Param('cardId') cardId: number,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.createComment(
      currentUserId,
      cardId,
      createCommentDto,
    );
    return this.commentService.buildCommentResponse(comment);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findCommentById(
    @Param('id') commentId: number,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.findCommentById(commentId);
    return this.commentService.buildCommentResponse(comment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @User('id') currentUserId: number,
    @Param('id') commentId: number,
  ): Promise<string> {
    return await this.commentService.deleteComment(currentUserId, commentId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateCommentById(
    @User('id') currentUserId: number,
    @Param('id') commentId: number,
    @Body('comment') updateCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.updateCommentById(
      currentUserId,
      commentId,
      updateCommentDto,
    );
    return this.commentService.buildCommentResponse(comment);
  }
}
