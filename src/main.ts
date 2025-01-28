import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS de manera básica
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
