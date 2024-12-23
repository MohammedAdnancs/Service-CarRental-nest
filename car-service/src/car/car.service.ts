/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Car } from './car.model';

@Injectable()
export class CarService {
  constructor(@Inject('CarModel') private readonly CarModel: Model<Car>) {}

  async create(car: Car): Promise<Car> {
    const newCar = new this.CarModel(car);
    return await newCar.save();
  }

  async findAll(): Promise<Car[]> {
    return await this.CarModel.find().exec();
  }

  async findOne(id: string): Promise<Car> {
    return await this.CarModel.findById(id).exec();
  }

  async update(id: string, car: Car): Promise<Car> {
    return await this.CarModel.findByIdAndUpdate(id, car, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.CarModel.deleteOne({ _id: id }).exec();
  }
}
