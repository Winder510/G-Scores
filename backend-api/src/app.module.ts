import { Module, Logger } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentSeeder } from './student/student.seeder';
import { ApiKeyModule } from './api-key/api-key.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache/cache.service';
import { createKeyv } from '@keyv/redis';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    TaskModule,
    StudentModule,
    ApiKeyModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        const keyv = createKeyv(process.env.REDIS_URL);
        const redisClient = keyv.opts.store;
        redisClient.on('connect', () => {
          Logger.log('Successfully connected to Redis', 'RedisConnection');
        });
        redisClient.on('error', (err) => {
          Logger.error(
            `Redis connection error: ${err.message}`,
            err.stack,
            'RedisConnection',
          );
        });
        return {
          stores: [keyv],
          ttl: 86400 * 1000,
          max: 100,
          prefix: 'gscores_cache:',
        };
      },
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [StudentSeeder, CacheService, TaskService],
})
export class AppModule {
  constructor(private readonly seeder: StudentSeeder) {}

  async onModuleInit() {
    await this.seeder.seed();
  }
}
