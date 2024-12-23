/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.model';

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Post()
    async create(@Body() createCarDto: Car): Promise<Car> {
        return this.carService.create(createCarDto);
    }

    @Get()
    async findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Car> {
        return this.carService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCarDto: Car): Promise<Car> {
        return this.carService.update(id, updateCarDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
        return this.carService.delete(id);
    }
}

