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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(email, carId, name, type, price, description, seller, pictures) {
        return this.cartService.addToCart(email, carId, name, type, price, description, seller, pictures);
    }
    async getCart(email) {
        return this.cartService.getCart(email);
    }
    async removeItem(id) {
        await this.cartService.removeItem(id);
        return { message: 'Cart item removed successfully' };
    }
    async clearCart(email) {
        try {
            await this.cartService.clearCart(email);
            return { message: 'Cart cleared successfully' };
        }
        catch (error) {
            console.error('Error clearing cart:', error);
            return { message: 'Failed to clear cart. Please try again later.' };
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)('userEmail')),
    __param(1, (0, common_1.Body)('carId')),
    __param(2, (0, common_1.Body)('name')),
    __param(3, (0, common_1.Body)('type')),
    __param(4, (0, common_1.Body)('price')),
    __param(5, (0, common_1.Body)('description')),
    __param(6, (0, common_1.Body)('seller')),
    __param(7, (0, common_1.Body)('pictures')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String, String, Array]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map