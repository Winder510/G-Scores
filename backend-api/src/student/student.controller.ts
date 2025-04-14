import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('find/:registrationNumber')
  findOne(@Param('registrationNumber') registrationNumber: string) {
    return this.studentService.findOne(registrationNumber);
  }

  @Get('statistics')
  getScoreStatistics() {
    return this.studentService.getScoreStatistics();
  }

  @Get('top-group-a')
  getTop10GroupAStudents() {
    return this.studentService.getTop10GroupAStudents();
  }
}
