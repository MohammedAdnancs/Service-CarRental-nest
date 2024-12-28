import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarSchema } from './car.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]), // Register the Car schema with Mongoose
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService], // Export the service if needed elsewhere
})
export class CarModule {}
