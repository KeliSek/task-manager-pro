import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

interface AuthUser {
  id: string;
  email: string;
}

@Controller('projects/:projectId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return await this.tasksService.create(user.id, projectId, dto);
  }

  @Get()
  async findAll(
    @CurrentUser() user: AuthUser,
    @Param('projectId') projectId: string,
    @Query() dto: FilterTaskDto,
  ) {
    return await this.tasksService.findAll(user.id, projectId, dto);
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: AuthUser,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return await this.tasksService.findOne(user.id, projectId, id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: AuthUser,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return await this.tasksService.update(user.id, id, projectId, dto);
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: AuthUser,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return await this.tasksService.remove(user.id, id, projectId);
  }
}
