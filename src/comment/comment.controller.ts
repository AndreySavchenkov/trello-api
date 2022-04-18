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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsResponseSwagger } from 'src/comment/types/commentsResponseSwagger';
import { CommentResponseSwagger } from 'src/comment/types/commentResponseSwagger';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('/user/columns/:columnId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all comments for specified card',
  })
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
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.findAllComments(cardId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create comment for specified card',
  })
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
    @Param('columnId') columnId: number,
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
  @ApiOperation({
    summary: 'Get comment by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get comment by id',
    type: CommentResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  async findCommentById(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.findCommentById(commentId);
    return this.commentService.buildCommentResponse(comment);
  }

  @Delete(':commentId')
  @ApiOperation({
    summary: 'Delete comment by id',
  })
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
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ): Promise<string> {
    return await this.commentService.deleteComment(currentUserId, commentId);
  }

  @Put(':commentId')
  @ApiOperation({
    summary: 'Update comment by id',
  })
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
