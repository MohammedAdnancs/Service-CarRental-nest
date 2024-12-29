import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() data: Partial<Review>): Promise<Review> {
    return this.reviewsService.createReview(data);
  }

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewsService.getAllReviews();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.getReviewById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Review>): Promise<Review> {
    return this.reviewsService.updateReview(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.reviewsService.deleteReview(id);
  }
}
