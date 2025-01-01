/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthUser } from './authuser.model';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('AuthUserModel') private readonly AuthuserModel: Model<AuthUser>) {}

  async register(email: string, password: string): Promise<AuthUser> {
    const newUser = new this.AuthuserModel({ email:email , password:password });
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.AuthuserModel.findOne({ email:email }).exec();
    if (!user) return false;
    if(password == user.password) return true
    return false
  }
  
  async logout(): Promise<boolean> {
    return true;
  }

}