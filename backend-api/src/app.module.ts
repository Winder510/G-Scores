import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentSeeder } from './student/student.seeder';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [PrismaModule, StudentModule, ApiKeyModule],
  controllers: [],
  providers: [StudentSeeder],
})
export class AppModule {
  constructor(private readonly seeder: StudentSeeder) {}

  async onModuleInit() {
    // await this.seeder.seed();
  }
}
