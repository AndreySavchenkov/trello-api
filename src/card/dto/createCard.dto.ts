import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(1000)
  readonly body: string;

  @MaxLength(500)
  readonly description?: string;
}
