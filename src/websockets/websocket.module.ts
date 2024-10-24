import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BinanceModule } from 'src/binance/binance.module';

import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [ConfigModule, forwardRef(() => BinanceModule)],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebSocketModule {}