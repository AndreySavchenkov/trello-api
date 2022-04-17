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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsResponseSwagger } from 'src/comment/types/commentsResponseSwagger';
import { CommentResponseSwagger } from 'src/comment/types/commentResponseSwagger';

@ApiTags('Comments')
@Controller('/users/columns/:columnId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all columns',
    type: CommentsResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  async findAllComments(
    @Param('cardId') cardId: number,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.findAllComments(cardId);
  }

  @Post()
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Create comment',
    type: CommentResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createComment(
    @User('id') currentUserId: number,
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.createComment(
      currentUserId,
      cardId,
      createCommentDto,
    );
    return this.commentService.buildCommentResponse(comment);
  }

  @Get(':commentId')
  @ApiResponse({
    status: 200,
    description: 'Get column by id',
    type: CommentResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  async findCommentById(
    @Param('commentId') commentId: number,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.findCommentById(commentId);
    return this.commentService.buildCommentResponse(comment);
  }

  @Delete(':commentId')
  @ApiResponse({
    status: 200,
    description: 'This comment deleted successful',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  async deleteComment(
    @User('id') currentUserId: number,
    @Param('commentId') commentId: number,
  ): Promise<string> {
    return await this.commentService.deleteComment(currentUserId, commentId);
  }

  @Put(':commentId')
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Create comment',
    type: CommentResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  async updateCommentById(
    @User('id') currentUserId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.updateCommentById(
      currentUserId,
      commentId,
      updateCommentDto,
    );
    return this.commentService.buildCommentResponse(comment);
  }
}
