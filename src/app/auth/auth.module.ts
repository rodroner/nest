import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../users/controllers/users.controller';
import { UsersModule } from 'src/websocket-users/users.module';

@Module({
  controllers: [
    AuthController,
    //UsersController
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthService
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot(),

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
    UsersModule

  ]
})
export class AuthModule { }
