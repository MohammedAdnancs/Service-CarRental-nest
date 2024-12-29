import { Schema, Document } from 'mongoose';
export interface CartItem extends Document {
    email: string;
    carId: string;
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    pictures: string[];
}
export declare const CartItemSchema: Schema<CartItem, import("mongoose").Model<CartItem, any, any, any, Document<unknown, any, CartItem> & CartItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CartItem, Document<unknown, {}, import("mongoose").FlatRecord<CartItem>> & import("mongoose").FlatRecord<CartItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
