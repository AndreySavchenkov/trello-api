import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(1000)
  body: string;
}
