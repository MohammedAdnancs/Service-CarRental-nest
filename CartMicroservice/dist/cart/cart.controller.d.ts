import { CartService } from './cart.service';
import { CartItem } from './cart.model';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(name: string, type: string, price: number, description: string, seller: string, pictures: string[]): Promise<CartItem>;
    getCart(): Promise<CartItem[]>;
    removeItem(id: string): Promise<{
        message: string;
    }>;
    clearCart(): Promise<{
        message: string;
    }>;
}
