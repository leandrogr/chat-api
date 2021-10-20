import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any) {
    this.server.to(payload.room).emit('msgToClient', payload, client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
    this.logger.log(`Client ${client.id} join room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
    this.logger.log(`Client ${client.id} leave room ${room}`);
  }

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
