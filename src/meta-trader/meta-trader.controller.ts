import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MetaTraderController {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('client connected');
    // Send a message to the client when the socket is successfully connected
    client.emit('connected', 'Hello, client! You are connected to the server.');
  }

  @SubscribeMessage('send_message')
  listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket, content);

    this.server.sockets.emit('receive_message', 'message');
  }
}
