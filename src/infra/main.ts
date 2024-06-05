import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const configService = app.get(EnvService); // o true é para informar que foi validado o env
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
