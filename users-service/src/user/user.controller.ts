/* eslint-disable prettier/prettier */
import { Controller,Post, Body} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user
  @Post('register')
  async register(@Body() body: { email: string; password: string ,username:string , birthday:Date , phonenumbers:string[], national_id:string}): Promise<any> {
    console.log(body.email)
    console.log(body.password)
    const newUser = await this.userService.signUpUser(body.email, body.password ,body.username , body.birthday , body.phonenumbers, body.national_id);
    return {user: newUser };
  }

  // Login a user
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const userProfile = await this.userService.loginUser(body.email, body.password);
    return userProfile? { userProfile:userProfile} : { message: 'wrong username or password' };
  }

}