import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Complain } from './complain.model';

@Injectable()
export class ComplainService {
  constructor(@Inject('ComplainModel') private readonly complainModel: Model<Complain>) {}

  // Create a new complaint
  async create(complain: Complain): Promise<Complain> {
    const newComplain = new this.complainModel(complain);
    return await newComplain.save();
  }

  // Fetch all complaints
  async findAll(): Promise<Complain[]> {
    return await this.complainModel.find().exec();
  }

  // Fetch complaints by user email
  async findByUserEmail(useremail: string): Promise<Complain[]> {
    return await this.complainModel.find({ useremail }).exec();
  }

  // Fetch a specific complaint by ID
  async findOne(id: string): Promise<Complain> {
    return await this.complainModel.findById(id).exec();
  }

  // Update a specific complaint by ID
  async update(id: string, complain: Complain): Promise<Complain> {
    return await this.complainModel.findByIdAndUpdate(id, complain, { new: true }).exec();
  }

  // Delete a specific complaint by ID
  async delete(id: string): Promise<any> {
    return await this.complainModel.deleteOne({ _id: id }).exec();
  }

  // Delete all complaints
  async deleteAll(): Promise<any> {
    return await this.complainModel.deleteMany({}).exec();
  }
}
