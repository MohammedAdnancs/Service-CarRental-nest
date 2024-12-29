import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
