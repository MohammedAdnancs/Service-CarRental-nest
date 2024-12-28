/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

// Define the interface for TypeScript
export interface Car extends Document {
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly description: string;
  readonly seller: string;
  readonly pictures: string[];
}

// Define the Mongoose schema for the local collection
export const CarSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  pictures: { type: [String], default: [] },
});

// Create and export the Mongoose model
export const CarModel = model<Car>('Car', CarSchema);