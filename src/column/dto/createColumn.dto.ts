import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @MaxLength(500)
  readonly description?: string;
}
