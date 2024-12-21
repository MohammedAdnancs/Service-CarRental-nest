/* eslint-disable prettier/prettier */
import { Controller,Post, Body} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user
  @Post('register')
  async register(@Body() body: { email: string; password: string }): Promise<any> {
    console.log(body.email)
    console.log(body.password)

    const newUser = await this.userService.signUpUser(body.email, body.password);
    return { message: 'User registered successfully', user: newUser };
  }

  // Login a user
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const isValid = await this.userService.loginUser(body.email, body.password);
    return isValid? { message: 'Login successful' } : { message: 'wrong username or password' };
  }

}