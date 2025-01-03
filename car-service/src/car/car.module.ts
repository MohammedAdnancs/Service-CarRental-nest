/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './car.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Car', schema: CarSchema}]),
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
