/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('UserSchema', UserSchema);