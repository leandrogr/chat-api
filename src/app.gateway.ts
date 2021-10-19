import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  // @SubscribeMessage('createRoom')
  // createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
  //   client.join(data, err => {
  //     if (err) {
  //       this.logger.error(err);
  //     }
  //   });
  // }

  afterInit(server: Server) {
    this.logger.log('Server websocket init...');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client websocket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client websocket disconnected: ${client.id}`);
  }
}
