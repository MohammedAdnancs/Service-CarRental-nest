import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './car.model';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  // Fetch all cars from the local database
  async getAllCars(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  // Search for cars based on query parameters
  async searchCars(query: any): Promise<Car[]> {
    const filter: any = {};

    // Name filter (case-insensitive)
    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' }; // Case-insensitive search
    }

    // Type filter (case-insensitive)
    if (query.type) {
      filter.type = { $regex: query.type, $options: 'i' }; // Case-insensitive search
    }

    // Price filters (ensure that priceMin and priceMax are numbers)
    if (query.priceMin || query.priceMax) {
      let priceMin: number | undefined = query.priceMin ? parseFloat(query.priceMin) : undefined;
      let priceMax: number | undefined = query.priceMax ? parseFloat(query.priceMax) : undefined;

      // Ensure priceMin and priceMax are valid numbers (only if they are provided)
      if (priceMin !== undefined && isNaN(priceMin)) {
        throw new Error('Invalid priceMin value');
      }
      if (priceMax !== undefined && isNaN(priceMax)) {
        throw new Error('Invalid priceMax value');
      }

      // Apply price range filter
      if (priceMin !== undefined && priceMax !== undefined) {
        filter.price = { $gte: priceMin, $lte: priceMax }; // Range query for price
      } else if (priceMin !== undefined) {
        filter.price = { $gte: priceMin }; // Only filter by minPrice
      } else if (priceMax !== undefined) {
        filter.price = { $lte: priceMax }; // Only filter by maxPrice
      }
    }

    // If no filters are applied, return all cars
    if (Object.keys(filter).length === 0) {
      return this.carModel.find().exec(); // Return all cars if no filters
    }

    // Perform the search with the constructed filter
    return this.carModel.find(filter).exec();
  }
}
