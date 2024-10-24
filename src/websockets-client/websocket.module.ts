import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WebsocketService } from './websocket-client.service';

@Module({
  imports: [ConfigModule],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebSocketModule {}