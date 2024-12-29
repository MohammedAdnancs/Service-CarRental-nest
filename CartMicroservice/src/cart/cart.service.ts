import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('CartItem') private readonly cartModel: Model<CartItem>,
  ) {}

  async addToCart(
    email: string,
    carId: string,
    name: string,
    type: string,
    price: number,
    description: string,
    seller: string,
    pictures: string[],
  ): Promise<CartItem> {
    const newCartItem = new this.cartModel({
      email,
      carId,
      name,
      type,
      price,
      description,
      seller,
      pictures,
    });

    return await newCartItem.save();
  }

  async getCart(email: string): Promise<CartItem[]> {
    return await this.cartModel.find({ email }).exec();
  }

  async removeItem(id: string): Promise<void> {
    await this.cartModel.findByIdAndDelete(id).exec();
  }

  async clearCart(email: string): Promise<void> {
    try {
      // Find all items by email
      const cartItems = await this.cartModel.find({ email }).exec();
      
      if (cartItems.length === 0) {
        throw new Error('No items found to delete');
      }
  
      // Delete each item by its _id
      const deletePromises = cartItems.map(item => this.cartModel.findByIdAndDelete(item._id).exec());
      await Promise.all(deletePromises); // Wait for all deletions to complete
  
      console.log(`${cartItems.length} items deleted from the cart.`);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Failed to clear cart');
    }
  }
  
  
}
