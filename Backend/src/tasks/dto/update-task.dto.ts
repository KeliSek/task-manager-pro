import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, TaskStatus } from '../../../dist/generated/prisma/client';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsOptional()
  @IsEnum(Priority)
  priority: Priority;

  @IsString()
  @IsOptional()
  assigneeId: string;
}
