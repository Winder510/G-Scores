import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StudentService } from '../student/student.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private studentService: StudentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Cron('0 0 1 * * *') // Runs at 1:00 AM every day
  async handleNightlyCache() {
    this.logger.log('Starting nightly cache update...');

    try {
      // Cache statistics
      const statistics = await this.studentService.getScoreStatistics();
      await this.cacheManager.set('gscores_cache:statistics', statistics);
      this.logger.log('Statistics cached successfully');

      // Cache top students
      const topStudents = await this.studentService.getTop10GroupAStudents();
      await this.cacheManager.set('gscores_cache:top', topStudents);
      this.logger.log('Top students cached successfully');
    } catch (error) {
      this.logger.error('Error during nightly cache update:', error);
    }
  }
}
