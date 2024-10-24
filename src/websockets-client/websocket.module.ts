import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebsocketService } from './websocket.service';
@Module({
  imports: [ConfigModule],
  providers: [WebsocketService],
})
export class WebSocketModule {}