import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, ApiKeyService],
  exports: [StudentService],
})
export class StudentModule {}
