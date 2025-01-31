import { Module } from '@nestjs/common';
import { ChatPrivateService } from './chat-private.service';
import { ChatPrivateGateway } from './chat-private.gateway';

@Module({
  providers: [ChatPrivateGateway, ChatPrivateService],
})
export class ChatPrivateModule {}
