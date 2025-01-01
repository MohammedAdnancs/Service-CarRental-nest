import { CarService } from './car.service';
import { Car } from './car.model';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: Car): Promise<Car>;
    findAll(): Promise<Car[]>;
    findOne(id: string): Promise<Car>;
    update(id: string, updateCarDto: Car, files: Express.Multer.File[]): Promise<Car>;
    remove(id: string): Promise<any>;
    uploadCar(files: Express.Multer.File[], carData: Car): Promise<Car>;
}
