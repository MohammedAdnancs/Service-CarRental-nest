/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly username: string;
  readonly birthday?: Date;
  readonly phonenumbers?: string[];
  readonly national_id?: string; 
}

export const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  birthday: { type: String, required: false },
  phonenumbers: { type: [String], required: false },
  national_id: { type: String, required: false },
});

export const UserModel = model<User>('UserSchema', UserSchema);