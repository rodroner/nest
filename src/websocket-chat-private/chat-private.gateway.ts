import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

interface Client {
  id: string;
  email1: string;
  email2: string;
}

/*
  Conexión del Cliente: Cuando un usuario se conecta, se le pasa su email1 y email2, y se asocian con un socket en el mapa clients.
  Este mapa guarda las relaciones entre los correos electrónicos y los IDs de los sockets.

  Envío de Mensajes: Cuando se recibe un mensaje de un cliente, buscamos al destinatario (en base a email2), y 
  si el destinatario está conectado, se le emite el mensaje a su socket correspondiente.

  Desconexión de Clientes: Cuando un cliente se desconecta, eliminamos su entrada del mapa clients.
*/

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class ChatPrivateGateway {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Client> = new Map();

  // Registrar cliente cuando se conecta
  @SubscribeMessage('connect-client')
  onClientConnect(@MessageBody() data: { email1: string; email2?: string }, @ConnectedSocket() socket: Socket) {
    const { email1, email2 } = data;
    const client: Client = { id: socket.id, email1, email2: email2 || '' };

    // Guardamos la conexión del usuario
    this.clients.set(email1, client); 

    console.log(`Cliente conectado: ${socket.id} : ${email1} <-> ${email2}`);
    console.log('Clientes actuales:')
    console.log(this.clients);
  }

  // Enviar mensaje
  @SubscribeMessage('send-message')
  onSendMessage(@MessageBody() data: { email1: string; email2: string; message: string }, @ConnectedSocket() socket: Socket) {
    const { email1, email2, message } = data;

    // Buscamos el socket correspondiente para email1 y email2
    const cliente1 = this.clients.get(email1);
    const cliente2 = this.clients.get(email2);

    console.log('🔹Mensaje en el cliente1: ' + cliente1.id + ', '+ cliente1.email1 +', '+ cliente1.email2);
    console.log('🔹Mensaje en el cliente2: ' + cliente2.id + ', '+ cliente2.email1 +', '+ cliente2.email2);

    if (cliente1) {
      this.server.to(cliente1.id).emit('receive-message', {
        email1,
        email2,
        message
      });
      console.log(`(${cliente1.id}) Mensaje enviado de ${email1} a ${email2}: ${message}`);
    } else {
      console.log(`El usuario ${email2} no está conectado`);
    }

    if (cliente2) {
      this.server.to(cliente2.id).emit('receive-message', {
        email1,
        email2,
        message
      });
      console.log(`(${cliente2.id}) Mensaje enviado de ${email1} a ${email2}: ${message}`);
    } else {
      console.log(`El usuario ${email2} no está conectado`);
    }
  }

  // Desconectar cliente
  @SubscribeMessage('disconnect-client')
  onClientDisconnect(@MessageBody() email: string) {
    this.clients.delete(email);
    console.log(`Cliente ${email} desconectado`);
  }
}
