import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WebsocketGateway } from './websocket.gateway';
import { BinanceModule } from 'src/binance/binance.module';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [ConfigModule, forwardRef(() => BinanceModule)],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebSocketModule {}