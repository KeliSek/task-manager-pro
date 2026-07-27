import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Project } from '../../dist/generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto): Promise<Project> {
    return await this.prisma.project.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }
  async findAll(userId: string): Promise<Project[]> {
    return await this.prisma.project.findMany({
      where: {
        ownerId: userId,
      },
    });
  }
  async findOne(userId: string, projectId: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });

    if (!project) throw new NotFoundException('Project Not Found');
    if (project.ownerId !== userId)
      throw new ForbiddenException('Access Denied');

    return project;
  }

  async update(
    userId: string,
    projectId: string,
    dto: UpdateProjectDto,
  ): Promise<Project> {
    const matchingProject = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!matchingProject) throw new NotFoundException('Project Not Found');
    if (matchingProject.ownerId !== userId)
      throw new ForbiddenException('Access Denied');

    return this.prisma.project.update({
      where: { id: projectId },
      data: { ...dto },
    });
  }

  async remove(userId: string, projectId: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== userId)
      throw new ForbiddenException('Access denied');

    return await this.prisma.project.delete({
      where: { id: projectId },
    });
  }
}
