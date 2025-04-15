import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'];
    const isValid = await this.apiKeyService.isKeyValid(key);

    if (isValid) {
      req.apiKey = key;
    }

    return isValid;
  }
}
