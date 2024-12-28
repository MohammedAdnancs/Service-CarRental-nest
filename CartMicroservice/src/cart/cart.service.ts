import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('CartItem') private readonly cartModel: Model<CartItem>,
  ) {}

  // Add a car to the cart with full car data
  async addToCart(
    name: string, 
    type: string, 
    price: number, 
    description: string, 
    seller: string, 
    pictures: string[], 
  ): Promise<CartItem> {
   
    const newCartItem = new this.cartModel({
      
      name,
      type,
      price,
      description,
      seller,
      pictures
    });

    return await newCartItem.save();
  }

  // Get all items in the cart
  async getCart(): Promise<CartItem[]> {
    return await this.cartModel.find().exec();
  }

  // Update the quantity of a cart item
  async updateQuantity(id: string, quantity: number): Promise<CartItem> {
    return await this.cartModel
      .findByIdAndUpdate(id, { quantity }, { new: true })
      .exec();
  }

  // Remove a cart item by ID
  async removeItem(id: string): Promise<void> {
    await this.cartModel.findByIdAndDelete(id).exec();
  }

  // Clear all items from the cart
  async clearCart(): Promise<void> {
    await this.cartModel.deleteMany().exec();
  }
}
