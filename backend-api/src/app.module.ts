import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ScoresModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
