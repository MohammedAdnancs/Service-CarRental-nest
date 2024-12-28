import { Schema, Document } from 'mongoose';
export interface CartItem extends Document {
    name: string;
    type: string;
    price: number;
    description: string;
    seller: string;
    pictures: string[];
}
export declare const CartItemSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    pictures: string[];
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    seller?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    pictures: string[];
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    seller?: string;
}>> & import("mongoose").FlatRecord<{
    pictures: string[];
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    seller?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CartModel: import("mongoose").Model<CartItem, {}, {}, {}, Document<unknown, {}, CartItem> & CartItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
