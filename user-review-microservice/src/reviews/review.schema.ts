import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) productId: string;
  @Prop({ required: true }) rating: number;
  @Prop() comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
