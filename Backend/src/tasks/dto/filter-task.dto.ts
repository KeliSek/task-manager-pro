import { IsEnum, IsOptional } from 'class-validator';
import { Priority, TaskStatus } from '../../../dist/generated/prisma/client';
export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
