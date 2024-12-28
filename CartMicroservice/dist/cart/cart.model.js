"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.CartItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CartItemSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    seller: { type: String, required: false },
    pictures: { type: [String], default: [] },
});
exports.CartModel = (0, mongoose_1.model)('CartItem', exports.CartItemSchema);
//# sourceMappingURL=cart.model.js.map