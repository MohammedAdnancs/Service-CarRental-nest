import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItemSchema } from './cart.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CartItem', schema: CartItemSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
