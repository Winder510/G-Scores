import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentSeeder } from './student/student.seeder';
import { ApiKeyModule } from './api-key/api-key.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache/cache.service';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    ApiKeyModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [createKeyv(process.env.REDIS_URL)],
          ttl: 86400 * 1000,
          max: 100,
          prefix: 'gscores_cache:',
        };
      },
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [StudentSeeder, CacheService],
})
export class AppModule {
  constructor(private readonly seeder: StudentSeeder) {}

  async onModuleInit() {
    // await this.seeder.seed();
  }
}
