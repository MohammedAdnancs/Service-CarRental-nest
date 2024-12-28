import { Model } from 'mongoose';
import { CartItem } from './cart.model';
export declare class CartService {
    private readonly cartModel;
    constructor(cartModel: Model<CartItem>);
    addToCart(name: string, type: string, price: number, description: string, seller: string, pictures: string[]): Promise<CartItem>;
    getCart(): Promise<CartItem[]>;
    updateQuantity(id: string, quantity: number): Promise<CartItem>;
    removeItem(id: string): Promise<void>;
    clearCart(): Promise<void>;
}
