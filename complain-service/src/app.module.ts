/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplainModule } from './complain/complain.module';  // Import the ComplainModule
import * as dotenv from 'dotenv'; 

dotenv.config(); 

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB), // Connect to the database using the URL in .env
    ComplainModule, // Import the ComplainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
