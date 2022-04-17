import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseSwaggerData } from 'src/comment/types/commentResponseSwaggerData';

export class CommentsResponseSwagger {
  @ApiProperty({ type: [CommentResponseSwaggerData] })
  comments: CommentResponseSwaggerData[];
}
