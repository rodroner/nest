import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

//controllers import { AppController } from './app.controller';
//providers import { AppService } from './app.service';

import { AuthModule } from '../app/auth/auth.module';
import { UsersController } from 'src/app/users/controllers/users.controller';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthController } from 'src/app/auth/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,    
  ],
  controllers: [
    AuthController,
    UsersController
  ],
  providers: [
    
  ],
})
export class AppModule {
  constructor(){
    console.log('process.env.MONGO_URI!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(process.env.MONGO_URI)
  }
}
