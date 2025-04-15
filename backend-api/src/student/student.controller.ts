import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiKeyGuard } from 'src/guard/apikey-auth-guard';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('find/:registrationNumber')
  @ResponseMessage('Find success')
  @UseGuards(ApiKeyGuard)
  findOne(@Param('registrationNumber') registrationNumber: string) {
    return this.studentService.findOne(registrationNumber);
  }

  @Get('statistics')
  @ResponseMessage('Get score statistics success')
  @UseGuards(ApiKeyGuard)
  getScoreStatistics() {
    return this.studentService.getScoreStatistics();
  }

  @Get('top-group-a')
  @ResponseMessage('Get top success')
  @UseGuards(ApiKeyGuard)
  getTop10GroupAStudents() {
    return this.studentService.getTop10GroupAStudents();
  }
}
