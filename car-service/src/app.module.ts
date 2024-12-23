/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import * as dotenv from 'dotenv'; 

dotenv.config(); 

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB), 
    CarModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
