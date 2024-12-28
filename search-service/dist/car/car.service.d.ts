import { Model } from 'mongoose';
import { Car } from './car.model';
export declare class CarService {
    private readonly carModel;
    constructor(carModel: Model<Car>);
    getAllCars(): Promise<Car[]>;
    searchCars(query: any): Promise<Car[]>;
}
