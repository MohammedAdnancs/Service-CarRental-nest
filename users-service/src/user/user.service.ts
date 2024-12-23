/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {HttpService} from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

    async loginUser(email: string, password: string): Promise<AxiosResponse<any>> {
        try {
            const response = await this.httpService
                .post('http://localhost:3001/auth/login', { email:email, password:password })
                .toPromise();
            return response.data;
        } catch (error) {
            throw new Error(`Authentication failed : ${error}`);
        }
    }

    async signUpUser(email: string, password: string): Promise<any> {
        try {
          // Send an HTTP POST request to the AuthenticationService sign-up endpoint
          const response: AxiosResponse<any> = await this.httpService
            .post('http://localhost:3001/auth/register', { email:email, password:password })
            .toPromise();
            
          return response.data;
        } catch (error) {
          // Handle errors (like email already taken, etc.)
          throw new Error('User sign-up failed: ' + error.response?.data?.message || error.message);
        }
    }

}