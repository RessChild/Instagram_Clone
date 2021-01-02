import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 서버 접근 포트
  await app.listen(Number(process.env.SERVER_PORT) || 3000);
}
bootstrap();
