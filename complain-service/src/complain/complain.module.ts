/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplainController } from './complain.controller';
import { ComplainService } from './complain.service';
import { ComplainSchema } from './complain.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Complain', schema: ComplainSchema }]),
  ],
  controllers: [ComplainController],
  providers: [ComplainService],
})
export class ComplainModule {}
