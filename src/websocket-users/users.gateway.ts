import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { UsersService } from './users.service';

@WebSocketGateway({ namespace: 'users', cors: { origin: '*' } })
export class UsersGateway implements OnModuleInit {

  @WebSocketServer()
  public server: Server;

  constructor(private readonly usersService: UsersService) { }

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      //console.log('Nuevo cliente conectado:', socket.id);

      //Emitir la lista de usuarios al conectar un cliente
      this.emitUsersUpdate();

      socket.on('disconnect', async () => {
        //console.log('Cliente desconectado:', socket.id);
      });
    });
  }

  //Emitir la lista de usuarios desde MongoDB
  public async emitUsersUpdate() {
    const users = await this.usersService.getAllUsers();
    this.server.emit('on-users-changed', users);
  }
}