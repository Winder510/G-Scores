import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiKeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApiKey() {
    const apiKey = await this.prismaService.apikey.create({
      data: {
        key: `apiKey_${uuidv4()}`,
      },
    });
    return apiKey.key;
  }

  async isKeyValid(apiKey: string) {
    if (!apiKey) {
      return false;
    }

    const apiKeyRecord = await this.prismaService.apikey.findFirst({
      where: { key: apiKey, active: true },
    });

    return !!apiKeyRecord;
  }
}
