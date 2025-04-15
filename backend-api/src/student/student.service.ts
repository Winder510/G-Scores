import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  private subjects = [
    'math',
    'literature',
    'foreign_language',
    'physics',
    'chemistry',
    'biology',
    'history',
    'geography',
    'civic_education',
  ];

  async getScoreStatistics() {
    const students = await this.prismaService.student.findMany();

    const levels = {
      '>=8': (score: number) => score >= 8,
      '6-8': (score: number) => score >= 6 && score < 8,
      '4-6': (score: number) => score >= 4 && score < 6,
      '<4': (score: number) => score < 4,
    };

    const result = {};

    for (const subject of this.subjects) {
      result[subject] = { '>=8': 0, '6-8': 0, '4-6': 0, '<4': 0 };

      for (const student of students) {
        const score = student[subject];
        if (typeof score === 'number') {
          for (const level in levels) {
            if (levels[level](score)) {
              result[subject][level]++;
              break;
            }
          }
        }
      }
    }

    return result;
  }

  async getTop10GroupAStudents() {
    const students = await this.prismaService.student.findMany();
    console.log(
      '🚀 ~ StudentService ~ getTop10GroupAStudents ~ students:',
      students,
    );

    const ranked = students
      .map((student) => {
        const { math, physics, chemistry } = student;
        const scores = [math, physics, chemistry];
        if (scores.every((s) => typeof s === 'number')) {
          const avg = (math + physics + chemistry) / 3;
          return { ...student, avg };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 10);

    return ranked.map(
      ({ id, registration_number, math, physics, chemistry, avg }) => ({
        id,
        registration_number,
        math,
        physics,
        chemistry,
        avg: parseFloat(avg.toFixed(2)),
      }),
    );
  }

  async findOne(registrationNumber: string) {
    const foundStudent = await this.prismaService.student.findFirst({
      where: {
        registration_number: registrationNumber,
      },
    });

    if (!foundStudent) throw new BadRequestException('Not found ');

    return foundStudent;
  }
}
