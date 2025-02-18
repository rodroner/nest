import { Module } from '@nestjs/common';
import { ChatPrivateService } from './services/chat-private.service';
import { MessageService } from './services/message.service';
import { ChatPrivateGateway } from './chat-private.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { MessagesController } from './controllers/message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
  ],
  controllers: [MessagesController],
  providers: [ChatPrivateGateway, ChatPrivateService, MessageService],
})
export class ChatPrivateModule {}
