import { Model } from 'mongoose';
import { Car } from './car.model';
export declare class CarService {
    private readonly CarModel;
    constructor(CarModel: Model<Car>);
    create(car: Car): Promise<Car>;
    findAll(): Promise<Car[]>;
    findOne(id: string): Promise<Car>;
    update(id: string, car: Car): Promise<Car>;
    delete(id: string): Promise<any>;
}
