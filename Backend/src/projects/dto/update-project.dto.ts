import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
