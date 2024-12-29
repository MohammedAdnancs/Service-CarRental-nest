import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { Complain } from './complain.model';

@Controller('complain')
export class ComplainController {
  constructor(private readonly complainService: ComplainService) {}

  // Create a new complaint
  @Post('')
  async create(@Body() createComplainDto: Complain): Promise<Complain> {
    return this.complainService.create(createComplainDto);
  }

  // Fetch all complaints, optionally filter by user email
  @Get()
  async findAll(@Query('useremail') useremail?: string): Promise<Complain[]> {
    if (useremail) {
      return this.complainService.findByUserEmail(useremail);
    }
    return this.complainService.findAll();
  }

  // Fetch a specific complaint by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Complain> {
    return this.complainService.findOne(id);
  }

  // Update a specific complaint by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateComplainDto: Complain): Promise<Complain> {
    return this.complainService.update(id, updateComplainDto);
  }

  // Delete a specific complaint by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.complainService.delete(id);
  }

  // Delete all complaints
  @Delete()
  async removeAll(): Promise<any> {
    return this.complainService.deleteAll();
  }
}
