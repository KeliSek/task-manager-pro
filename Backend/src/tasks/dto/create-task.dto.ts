import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority, TaskStatus } from '../../../dist/generated/prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  @IsString()
  assigneeId: string;
}
