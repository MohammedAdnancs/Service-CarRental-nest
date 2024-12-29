import { Model } from 'mongoose';
import { Review } from './review.schema';
export declare class ReviewsService {
    private readonly reviewModel;
    constructor(reviewModel: Model<Review>);
    createReview(data: Partial<Review>): Promise<Review>;
    getAllReviews(): Promise<Review[]>;
    getReviewById(id: string): Promise<Review>;
    updateReview(id: string, data: Partial<Review>): Promise<Review>;
    deleteReview(id: string): Promise<any>;
}
