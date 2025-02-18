import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async createMessage(email1: string, email2: string, message: string): Promise<Message> {
    const newMessage = new this.messageModel({ email1, email2, message });
    return await newMessage.save();
  }

  async getMessages(email1: string, email2: string): Promise<Message[]> {
    return await this.messageModel.find({
      $or: [
        { email1, email2 },
        { email1: email2, email2: email1 }
      ]
    }).sort({ timestamp: 1 }).exec();
  }
}