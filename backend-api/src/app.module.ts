import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentSeeder } from './student/student.seeder';

@Module({
  imports: [PrismaModule, StudentModule],
  controllers: [],
  providers: [StudentSeeder],
})
export class AppModule {
  constructor(private readonly seeder: StudentSeeder) {}

  async onModuleInit() {
    // await this.seeder.seed();
  }
}
