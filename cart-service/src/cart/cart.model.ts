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

export const CartItemSchema = new Schema<CartItem>({
  email: { type: String, required: false },
  carId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  pictures: { type: [String], required: true },
});
