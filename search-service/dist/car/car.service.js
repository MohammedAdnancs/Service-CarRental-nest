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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CarService = class CarService {
    constructor(carModel) {
        this.carModel = carModel;
    }
    async getAllCars() {
        return this.carModel.find().exec();
    }
    async searchCars(query) {
        const filter = {};
        if (query.name) {
            filter.name = { $regex: query.name, $options: 'i' };
        }
        if (query.type) {
            filter.type = { $regex: query.type, $options: 'i' };
        }
        if (query.priceMin || query.priceMax) {
            let priceMin = query.priceMin ? parseFloat(query.priceMin) : undefined;
            let priceMax = query.priceMax ? parseFloat(query.priceMax) : undefined;
            if (priceMin !== undefined && isNaN(priceMin)) {
                throw new Error('Invalid priceMin value');
            }
            if (priceMax !== undefined && isNaN(priceMax)) {
                throw new Error('Invalid priceMax value');
            }
            if (priceMin !== undefined && priceMax !== undefined) {
                filter.price = { $gte: priceMin, $lte: priceMax };
            }
            else if (priceMin !== undefined) {
                filter.price = { $gte: priceMin };
            }
            else if (priceMax !== undefined) {
                filter.price = { $lte: priceMax };
            }
        }
        if (Object.keys(filter).length === 0) {
            return this.carModel.find().exec();
        }
        return this.carModel.find(filter).exec();
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Car')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarService);
//# sourceMappingURL=car.service.js.map