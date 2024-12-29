"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async addToCart(email, carId, name, type, price, description, seller, pictures) {
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
    async getCart(email) {
        return await this.cartModel.find({ email }).exec();
    }
    async removeItem(id) {
        await this.cartModel.findByIdAndDelete(id).exec();
    }
    async clearCart(email) {
        try {
            const cartItems = await this.cartModel.find({ email }).exec();
            if (cartItems.length === 0) {
                throw new Error('No items found to delete');
            }
            const deletePromises = cartItems.map(item => this.cartModel.findByIdAndDelete(item._id).exec());
            await Promise.all(deletePromises);
            console.log(`${cartItems.length} items deleted from the cart.`);
        }
        catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Failed to clear cart');
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CartItem')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map