/* eslint-disable prettier/prettier */
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Put, 
    Delete, 
    UseInterceptors, 
    UploadedFiles 
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { v4 as uuidv4 } from 'uuid';
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
@UseInterceptors(
  FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: 'C:/Users/medoa/Desktop/Car-Rental-Nest-database/car-rental-frontend/public/uploads',
      filename: (req, file, callback) => {
        const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueFilename);
      },
    }),
  }),
)
async update(
  @Param('id') id: string, 
  @Body() updateCarDto: Car, 
  @UploadedFiles() files: Express.Multer.File[],
): Promise<Car> {
  console.log('Uploaded files:', files);

  if (files && files.length > 0) {
    const filePaths = files.map((file) => `/uploads/${file.filename}`);
    console.log('Mapped file paths:', filePaths);
    updateCarDto.pictures = filePaths; // Assuming 'pictures' is an array of strings
  }

  return this.carService.update(id, updateCarDto);
}
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
      return this.carService.delete(id);
}

@Post('upload')
@UseInterceptors(
  FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: 'C:/Users/medoa/Desktop/Car-Rental-Nest-database/car-rental-frontend/public/uploads', // Save in the public/uploads folder
      filename: (req, file, callback) => {
        const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueFilename);
      },
    }),
  }),
)

async uploadCar(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() carData: Car,
): Promise<Car> {
  // Save relative paths for React's public folder
  const filePaths = files.map((file) => `/uploads/${file.filename}`);
  carData.pictures = filePaths;

  // Save car data to the database
  return this.carService.create(carData);
}
}
  