import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;
}
