import { Schema, Document, model } from 'mongoose';

export interface CartItem extends Document {
  name: string;           // Name of the car
  type: string;           // Type of car (e.g., SUV, Sedan)
  price: number;          // Price per day
  description: string;    // Description of the car
  seller: string;         // Seller name
  pictures: string[];     // Array of picture URLs
}

export const CartItemSchema = new Schema({
  name: { type: String, required: false },
  type: { type: String, required: false },
  price: { type: Number, required: false },
  description: { type: String, required: false },
  seller: { type: String, required: false },
  pictures: { type: [String], default: [] },
});

export const CartModel = model<CartItem>('CartItem', CartItemSchema);
