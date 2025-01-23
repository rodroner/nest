import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

//controllers import { AppController } from './app.controller';
//providers import { AppService } from './app.service';

import { AuthModule } from '../app/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
  }
}
