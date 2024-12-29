import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the cart microservice
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests from the frontend on this URL
    methods: 'GET,POST,PUT,DELETE',  // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Allow specific headers
  });

  // Use environment variable for port, default to 3005 if not set
  await app.listen(process.env.PORT ?? 3005); 
}
bootstrap();
