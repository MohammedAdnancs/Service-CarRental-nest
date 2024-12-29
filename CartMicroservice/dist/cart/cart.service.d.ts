import { Model } from 'mongoose';
import { CartItem } from './cart.model';
export declare class CartService {
    private readonly cartModel;
    constructor(cartModel: Model<CartItem>);
    addToCart(email: string, carId: string, name: string, type: string, price: number, description: string, seller: string, pictures: string[]): Promise<CartItem>;
    getCart(email: string): Promise<CartItem[]>;
    removeItem(id: string): Promise<void>;
    clearCart(email: string): Promise<void>;
}
