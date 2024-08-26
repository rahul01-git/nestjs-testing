import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  IsInt,
} from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed'], {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  readonly status: 'pending' | 'in_progress' | 'completed';

  @IsOptional()
  @IsDate()
  readonly dueDate?: Date;

  @IsNotEmpty()
  @IsInt()
  readonly categoryId?: number;
}
