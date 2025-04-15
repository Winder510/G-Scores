import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
    const result = {};

    for (const subject of this.subjects) {
      const [gte8, range6to8, range4to6, lt4] = await Promise.all([
        this.prismaService.student.count({
          where: {
            [subject]: {
              not: null,
              gte: 8,
            },
          },
        }),
        this.prismaService.student.count({
          where: {
            [subject]: {
              not: null,
              gte: 6,
              lt: 8,
            },
          },
        }),
        this.prismaService.student.count({
          where: {
            [subject]: {
              not: null,
              gte: 4,
              lt: 6,
            },
          },
        }),
        this.prismaService.student.count({
          where: {
            [subject]: {
              not: null,
              lt: 4,
            },
          },
        }),
      ]);

      result[subject] = {
        '>=8': gte8,
        '6-8': range6to8,
        '4-6': range4to6,
        '<4': lt4,
      };
    }

    return result;
  }

  async getTop10GroupAStudents() {
    try {
      const students = await this.prismaService.student.aggregateRaw({
        pipeline: [
          {
            $match: {
              math: { $ne: null },
              physics: { $ne: null },
              chemistry: { $ne: null },
            },
          },
          {
            $addFields: {
              total: { $add: ['$math', '$physics', '$chemistry'] },
            },
          },
          {
            $sort: { total: -1 },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              _id: 0,
              registration_number: 1,
              math: 1,
              physics: 1,
              chemistry: 1,
              total: 1,
            },
          },
        ],
      });

      return students;
    } catch (error) {
      console.error('Error fetching top 10 students:', error);
      throw new Error('Could not fetch top students');
    }
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
