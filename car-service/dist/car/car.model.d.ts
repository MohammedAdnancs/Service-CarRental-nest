import { Schema, Document } from 'mongoose';
export interface Car extends Document {
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    y: any;
    pictures: string[];
}
export declare const CarSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    pictures: string[];
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    pictures: string[];
}>> & import("mongoose").FlatRecord<{
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    pictures: string[];
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CarModel: import("mongoose").Model<Car, {}, {}, {}, Document<unknown, {}, Car> & Car & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
