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
const mongoose_1 = require("mongoose");
let CarService = class CarService {
    constructor(CarModel) {
        this.CarModel = CarModel;
    }
    async create(car) {
        const newCar = new this.CarModel(car);
        return await newCar.save();
    }
    async findAll() {
        return await this.CarModel.find().exec();
    }
    async findOne(id) {
        return await this.CarModel.findById(id).exec();
    }
    async update(id, car) {
        return await this.CarModel.findByIdAndUpdate(id, car, { new: true }).exec();
    }
    async delete(id) {
        return await this.CarModel.deleteOne({ _id: id }).exec();
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CarModel')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CarService);
//# sourceMappingURL=car.service.js.map