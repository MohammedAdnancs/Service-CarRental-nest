/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUserSchema } from './authuser.model';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AuthUser', schema: AuthUserSchema }]),
    HttpModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
