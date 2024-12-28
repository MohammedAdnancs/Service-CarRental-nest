/* eslint-disable prettier/prettier */
import { Controller,Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(@Body() body: { email: string; password: string }): Promise<any> {
    const newUser = await this.authService.register(body.email,body.password);
    return { user: newUser };
  }

  // Login a user
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{message:string}> {
    const isValid = await this.authService.login(body.email, body.password);
    return isValid? { message: 'Login successful' } : { message: 'wrong username or password' };
  }

}