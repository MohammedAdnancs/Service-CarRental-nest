import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async createReview(data: Partial<Review>): Promise<Review> {
    const newReview = new this.reviewModel(data);
    return newReview.save();
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async getReviewById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async updateReview(id: string, data: Partial<Review>): Promise<Review> {
    return this.reviewModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteReview(id: string): Promise<any> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
