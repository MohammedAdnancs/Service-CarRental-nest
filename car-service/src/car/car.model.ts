/* eslint-disable prettier/prettier */
import { Schema, Document, model, Double } from 'mongoose';

export interface Car extends Document {
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly description: string;
  readonly seller: string;
  readonly pictures: string[];  
}

export const CarSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  pictures: { type: [String], default: [] }
});

export const CarModel = model<Car>('CarSchema', CarSchema);