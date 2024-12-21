/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('UserModel') private readonly userModel: Model<User>) {}

  async register(email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ email:email , password:password });
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email:email }).exec();
    if (!user) return false;
    if(password == user.password) return true
    return false
  }
  
  async logout(): Promise<boolean> {
    return true;
  }

}