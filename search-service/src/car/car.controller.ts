import { Controller, Get, Query } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('search')
  async searchCars(@Query() query: any) {
    try {
      const cars = await this.carService.searchCars(query);
      return { data: cars };
    } catch (error) {
      return { status: 'error', message: error.message || 'An error occurred' };
    }
  }

  @Get()
  async getAllCars() {
    try {
      const cars = await this.carService.getAllCars();
      return { status: 'success', data: cars };
    } catch (error) {
      return { status: 'error', message: error.message || 'An error occurred' };
    }
  }
}

