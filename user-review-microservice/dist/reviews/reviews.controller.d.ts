import { ReviewsService } from './reviews.service';
import { Review } from './review.schema';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(data: Partial<Review>): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, data: Partial<Review>): Promise<Review>;
    delete(id: string): Promise<any>;
}
