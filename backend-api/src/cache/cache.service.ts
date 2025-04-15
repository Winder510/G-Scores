import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setKeyCache(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  async getKeyCache(key: string) {
    await this.cacheManager.get(key);
  }

  async deleteKeyCache(key: string) {
    await this.cacheManager.del(key);
  }
}
