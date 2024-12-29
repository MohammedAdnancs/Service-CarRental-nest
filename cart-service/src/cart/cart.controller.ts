import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add a car to the cart with full car data
  @Post('add')
  async addToCart(
    @Body('userEmail') email:string,
    @Body('carId') carId: string,
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('seller') seller: string,
    @Body('pictures') pictures: string[],
  ): Promise<CartItem> {
    return this.cartService.addToCart(
      email, // Pass userId from session
      carId,
      name,
      type,
      price,
      description,
      seller,
      pictures,
    );
  }

  @Get(':email')
  async getCart(@Param('email') email: string): Promise<CartItem[]> {
    return this.cartService.getCart(email);
  }

  @Delete(':id')
  async removeItem(@Param('id') id: string): Promise<{ message: string }> {
    await this.cartService.removeItem(id);
    return { message: 'Cart item removed successfully' };
  }

  // Clear the cart for a given user email
  @Delete(':email')
async clearCart(@Param('email') email: string): Promise<{ message: string }> {
  try {
    // Call the service to clear the cart (deleting items by their _id)
    await this.cartService.clearCart(email);  
    return { message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    // Return an appropriate message if something goes wrong
    return { message: 'Failed to clear cart. Please try again later.' };
  }
}

}
