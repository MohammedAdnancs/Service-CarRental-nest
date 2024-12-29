import { CarService } from './car.service';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    searchCars(query: any): Promise<{
        data: import("./car.model").Car[];
        status?: undefined;
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
