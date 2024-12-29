import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Add a new review
  @Post('add')
  async create(@Body() data: Partial<Review>): Promise<Review> {
    return this.reviewsService.createReview(data);
  }

  // Get all reviews
  @Get('getallreviews')
  async findAll(): Promise<Review[]> {
    return this.reviewsService.getAllReviews();
  }

  // Get a single review by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.getReviewById(id);
  }

  // Update a review by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Review>): Promise<Review> {
    return this.reviewsService.updateReview(id, data);
  }

  // Delete a review by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.reviewsService.deleteReview(id);
  }
}
