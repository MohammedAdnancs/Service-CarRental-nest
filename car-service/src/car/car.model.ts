/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Car extends Document {
  name: string; 
  type: string; 
  price: number; 
  description: string; 
  seller: string; y
  pictures: string[]; 
}

export const CarSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  pictures: { type: [String], default: [] }
});

export const CarModel = model<Car>('Car', CarSchema);
