import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(
    @Query('email1') email1: string,
    @Query('email2') email2: string,
  ) {
    return await this.messageService.getMessages(email1, email2);
  }
}