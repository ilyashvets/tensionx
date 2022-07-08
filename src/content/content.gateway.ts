import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { ContentService } from './content.service';

@WebSocketGateway({ cors: true })
export class ContentGateway implements OnGatewayInit {

  constructor(private readonly contentService: ContentService) {
  }

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ContentGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('getContent')
  async handleMessage(client: Socket, data: any) {
    return this.contentService.getContent(client.handshake.auth.token, data)
  }
}