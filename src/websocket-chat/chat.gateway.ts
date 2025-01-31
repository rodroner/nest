import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) { }

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {

      const { name, token } = socket.handshake.auth;
      console.log('CONECTTION CHAT.GATEWAY.TS -> ' + name);

      if (!name) {
        socket.disconnect();
        console.log('DISCONECTTION CHAT.GATEWAY.TS -> !name');
        return;
      }

      // Agregar cliente al listaod
      this.chatService.onClientConnected({ id: socket.id, name: name });

      // listado actualizado de clientes conectados
      this.server.emit('on-clients-changed', this.chatService.getClients());

      // Mensaje de bienvenida
      // socket.emit('welcome-message', 'Bienvenido al servidor');

      // Listado de clientes conectados
      this.server.emit('on-clients-changed', this.chatService.getClients());

      // Manejar desconexión
      socket.on('disconnect', () => {
        this.chatService.onClientDisconnected(socket.id);
        this.server.emit('on-clients-changed', this.chatService.getClients());
        console.log('DISCONECTTION CHAT.GATEWAY.TS -> ' + name);
        // console.log('Cliente desconectado: ', socket.id);
      })
    });
  }
  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {

    const { name, token } = client.handshake.auth;
    // console.log({name, message});
    if (!message) {
      return;
    }

    this.server.emit(
      'on-message',
      {
        userId: client.id,
        message: message,
        name: name,
      }
    )
  }

  @SubscribeMessage('get-clients')
  handleGetClients(@ConnectedSocket() client: Socket) {
    client.emit('on-clients-changed', this.chatService.getClients());
  }
}