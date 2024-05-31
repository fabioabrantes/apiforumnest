import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const configService = app.get<ConfigService<Env, true>>(ConfigService); // o true é para informar que foi validado o env
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
