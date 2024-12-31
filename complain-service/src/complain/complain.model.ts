/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Complain extends Document {
  readonly username: string;
  readonly useremail: string;
  readonly complaint: string;
  readonly createdAt: Date;
}

export const ComplainSchema = new Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  complaint: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ComplaintModel = model<Complain>('Complaint', ComplainSchema);
