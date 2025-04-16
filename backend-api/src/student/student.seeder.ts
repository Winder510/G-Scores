import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as path from 'path';

@Injectable()
export class StudentSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const csvFilePath = path.join(
      __dirname,
      '..',
      '..',
      'diem_thi_thpt_2024.csv',
    );

    // Check if CSV file exists
    if (!fs.existsSync(csvFilePath)) {
      console.error(`Error: CSV file not found at ${csvFilePath}`);
      throw new Error(`CSV file not found at ${csvFilePath}`);
    }

    console.log(`Reading CSV file from ${csvFilePath}`);
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');

    try {
      await new Promise<void>((resolve, reject) => {
        parse(
          csvData,
          { columns: true, skip_empty_lines: true },
          async (err, records) => {
            if (err) {
              console.error('Error parsing CSV:', err);
              reject(err);
              return;
            }

            if (!records || records.length === 0) {
              console.warn('No data found in CSV file');
              resolve();
              return;
            }

            console.log(`Found ${records.length} records in CSV file`);

            // Optional: Clear existing data
            console.log('Clearing existing data...');
            // await this.prisma.student.deleteMany({});
            console.log('Existing data cleared');

            console.log('Importing data...');

            const batchSize = 100000;
            let successCount = 0;
            let errorCount = 0;

            for (let i = 0; i < records.length; i += batchSize) {
              const batch = records.slice(i, i + batchSize);
              const studentsData = [];

              // Prepare batch data
              for (const record of batch) {
                try {
                  if (!record.sbd) {
                    console.warn(
                      `Skipping record with missing SBD: ${JSON.stringify(record)}`,
                    );
                    errorCount++;
                    continue;
                  }

                  studentsData.push({
                    registration_number: record.sbd,
                    math: parseFloat(record.toan) || null,
                    literature: parseFloat(record.ngu_van) || null,
                    foreign_language: parseFloat(record.ngoai_ngu) || null,
                    physics: parseFloat(record.vat_li) || null,
                    chemistry: parseFloat(record.hoa_hoc) || null,
                    biology: parseFloat(record.sinh_hoc) || null,
                    history: parseFloat(record.lich_su) || null,
                    geography: parseFloat(record.dia_li) || null,
                    civic_education: parseFloat(record.gdcd) || null,
                    foreign_language_code: record.ma_ngoai_ngu || null,
                  });
                } catch (error) {
                  console.error(
                    `Error preparing record for SBD ${record.sbd}:`,
                    error.message,
                  );
                  errorCount++;
                }
              }

              // Use createMany to insert the batch
              try {
                const result = await this.prisma.student.createMany({
                  data: studentsData,
                });
                successCount += result.count;
                console.log(
                  `Processed batch ${i / batchSize + 1}: ${successCount} records imported`,
                );
              } catch (error) {
                console.error('Error during createMany:', error.message);
                errorCount += studentsData.length;
              }
            }

            console.log(
              `Import completed: ${successCount} records imported successfully, ${errorCount} records failed`,
            );
            resolve();
          },
        );
      });
    } catch (error) {
      console.error('Error during seeding process:', error.message);
      throw error;
    }
  }
}
