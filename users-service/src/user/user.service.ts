/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {HttpService} from '@nestjs/axios';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private readonly UserModel: Model<User>,
    private readonly httpService: HttpService,            
  ) {}

  async loginUser(email: string, password: string): Promise<any> {
    try {

        const response: AxiosResponse<any> = await  this.httpService
            .post('http://localhost:3003/auth/login', { email:email, password:password })
            .toPromise();

        if(response.data){
          const userProfile = await this.UserModel.findOne({}).where('email').equals(email);
          console.log(userProfile);
          console.log(userProfile.email);
          console.log(userProfile.username);
          console.log(userProfile.birthday);
          console.log(userProfile.phonenumbers);
          console.log(userProfile.national_id);
          return userProfile;
        }
    
      } catch (error) {
          throw new Error(`Authentication failed : ${error}`);
      }
  }

  async signUpUser(email: string, password: string ,username:string , birthday:Date , phonenumbers:string[], national_id:string): Promise<any> {
    try {
        // Send an HTTP POST request to the AuthenticationService sign-up endpoint
        const response: AxiosResponse<any> = await this.httpService
          .post('http://localhost:3003/auth/register', { email:email, password:password })
          .toPromise(); 

        if(response.data){
          const newUserProfile = new this.UserModel({ email: email,username:username , birthday:birthday , phonenumbers:phonenumbers, national_id:national_id});
          await newUserProfile.save();
          return newUserProfile;
        }

      } catch (error) {
        // Handle errors (like email already taken, etc.)
        throw new Error('User sign-up failed: ' + error.response?.data?.message || error.message);
      }
  }

}