import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/transform.intercepter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: [`${process.env.FRONTEND_URL}`],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
