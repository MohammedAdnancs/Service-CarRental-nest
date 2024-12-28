import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add a car to the cart with full car data
  @Post('add')
  async addToCart(
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('seller') seller: string,
    @Body('pictures') pictures: string[],
  ): Promise<CartItem> {
    return this.cartService.addToCart(
      name,
      type,
      price,
      description,
      seller,
      pictures
    );
  }

  // Get all items in the cart
  @Get()
  async getCart(): Promise<CartItem[]> {
    return this.cartService.getCart();
  }

  // Remove a cart item by ID
  @Delete(':id')
  async removeItem(@Param('id') id: string): Promise<{ message: string }> {
    await this.cartService.removeItem(id);
    return { message: 'Cart item removed successfully' };
  }

  // Clear all items from the cart
  @Delete()
  async clearCart(): Promise<{ message: string }> {
    await this.cartService.clearCart();
    return { message: 'Cart cleared successfully' };
  }
}
