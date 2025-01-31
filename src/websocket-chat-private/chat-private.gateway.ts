import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatPrivateService } from './chat-private.service';

//Se lanza en /users pero sólo cuando clickamos en un usuario
@WebSocketGateway({ namespace:'chatprivate', cors: { origin: '*' } })
export class ChatPrivateGateway {

  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatPrivateService: ChatPrivateService) { }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    console.log(`Usuario ${data.userId} se ha unido al chat`);
    client.join(`chat_${data.userId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { senderId: string, receiverId: string, message: string }) {
    const room = `chat_${data.receiverId}`;
    this.server.to(room).emit('newMessage', data);
  }
}