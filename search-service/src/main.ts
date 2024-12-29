import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS and allow the frontend origin
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET',
    credentials: true, // Enable if you are using cookies or auth headers
  });

  await app.listen(3007); // Backend port
}
bootstrap();

