import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseSwaggerData } from 'src/comment/types/commentResponseSwaggerData';

export class CommentResponseSwagger {
  @ApiProperty()
  comment: CommentResponseSwaggerData;
}
