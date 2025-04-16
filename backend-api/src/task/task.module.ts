import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [StudentModule],
  providers: [TaskService],
})
export class TaskModule {}