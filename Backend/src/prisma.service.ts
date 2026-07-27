import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../dist/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({
      adapter,
      log: ['warn', 'error'],
    } satisfies Prisma.PrismaClientOptions);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
