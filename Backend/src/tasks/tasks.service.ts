import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Task } from '../../dist/generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private Prisma: PrismaService) {}
  private async verifyProjectOwnership(userId: string, projectId: string) {
    const project = await this.Prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== userId)
      throw new ForbiddenException('Access denied');
  }

  async create(
    userId: string,
    projectId: string,
    dto: CreateTaskDto,
  ): Promise<Task> {
    await this.verifyProjectOwnership(userId, projectId);
    return this.Prisma.task.create({
      data: {
        ...dto,
        assigneeId: userId,
        projectId: projectId,
      },
    });
  }

  async findAll(
    userId: string,
    projectId: string,
    dto: FilterTaskDto,
  ): Promise<Task[]> {
    await this.verifyProjectOwnership(userId, projectId);
    return await this.Prisma.task.findMany({
      where: {
        projectId: projectId,
        status: dto.status,
        priority: dto.priority,
      },
    });
  }

  async findOne(
    userId: string,
    projectId: string,
    taskId: string,
  ): Promise<Task> {
    await this.verifyProjectOwnership(userId, projectId);
    const task = await this.Prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) throw new NotFoundException('Task not Found');
    return task;
  }

  async update(
    userId: string,
    taskId: string,
    projectId: string,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    await this.verifyProjectOwnership(userId, projectId);
    const matchingTask = await this.Prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!matchingTask) throw new NotFoundException('Task Not Found');
    return this.Prisma.task.update({
      where: { id: taskId },
      data: { ...dto },
    });
  }

  async remove(
    userId: string,
    taskId: string,
    projectId: string,
  ): Promise<Task> {
    await this.verifyProjectOwnership(userId, projectId);
    const task = await this.Prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!task) throw new NotFoundException('Task not Found');
    return this.Prisma.task.delete({
      where: { id: taskId },
    });
  }
}
