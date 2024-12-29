import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow your frontend to communicate with the backend
  app.enableCors();

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
