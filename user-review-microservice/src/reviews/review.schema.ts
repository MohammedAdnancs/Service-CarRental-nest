import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true }) useremail: string;
  @Prop({ required: true }) productId: string;
  @Prop({ required: true }) productName: string;
  @Prop({ required: true }) sellerName: string;
  @Prop({ required: true }) Review: string;
  @Prop({ required: true }) rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
