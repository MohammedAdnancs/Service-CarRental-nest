import { Document } from 'mongoose';
export declare class Review extends Document {
    userId: string;
    productId: string;
    rating: number;
    comment: string;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, Document<unknown, any, Review> & Review & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, Document<unknown, {}, import("mongoose").FlatRecord<Review>> & import("mongoose").FlatRecord<Review> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
