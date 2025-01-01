/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface AuthUser extends Document {
  readonly email: string;
  readonly password: string;
}

export const AuthUserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const AuthUserModel = model<AuthUser>('AuthUserSchema', AuthUserSchema);