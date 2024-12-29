"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CartItemSchema = new mongoose_1.Schema({
    email: { type: String, required: false },
    carId: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    seller: { type: String, required: true },
    pictures: { type: [String], required: true },
});
//# sourceMappingURL=cart.model.js.map