import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async createApiKey() {
    const apiKey = await this.apiKeyService.createApiKey();
    return { apiKey };
  }
}
