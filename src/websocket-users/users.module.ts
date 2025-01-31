import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/app/auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersGateway, UsersService],
  exports: [UsersService, UsersGateway],
})
export class UsersModule {}
