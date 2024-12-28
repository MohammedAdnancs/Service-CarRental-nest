import { CarService } from './car.service';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    searchCars(query: any): Promise<{
        status: string;
        data: import("./car.model").Car[];
        message?: undefined;
    } | {
        status: string;
        message: any;
        data?: undefined;
    }>;
    getAllCars(): Promise<{
        status: string;
        data: import("./car.model").Car[];
        message?: undefined;
    } | {
        status: string;
        message: any;
        data?: undefined;
    }>;
}
