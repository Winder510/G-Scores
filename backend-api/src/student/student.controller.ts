import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiKeyGuard } from 'src/guard/apikey-auth-guard';
import { ResponseMessage } from 'src/decorator/customize';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getHello() {
    return 'Hello student from server';
  }

  @Get('find/:registrationNumber')
  @ResponseMessage('Find success')
  @UseGuards(ApiKeyGuard)
  findOne(@Param('registrationNumber') registrationNumber: string) {
    return this.studentService.findOne(registrationNumber);
  }

  @Get('statistics')
  @ResponseMessage('Get score statistics success')
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('statistics')
  getScoreStatistics() {
    return this.studentService.getScoreStatistics();
  }

  @Get('top-group-a')
  @ResponseMessage('Get top success')
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('top')
  getTop10GroupAStudents() {
    console.log('INSIDE controller');
    return this.studentService.getTop10GroupAStudents();
  }
}
