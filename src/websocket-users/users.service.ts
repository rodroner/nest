import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/app/auth/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}  

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();  
  }

  async getUsersConnected(): Promise<User[]> {
    return this.userModel.find({ isConnected: true }).exec();  
  }

  async getUsersDesconnected(): Promise<User[]> {
    return this.userModel.find({ isConnected: false }).exec();  
  }
}