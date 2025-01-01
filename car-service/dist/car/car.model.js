"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = exports.CarSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CarSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    seller: { type: String, required: true },
    pictures: { type: [String], default: [] }
});
exports.CarModel = (0, mongoose_1.model)('Car', exports.CarSchema);
//# sourceMappingURL=car.model.js.map