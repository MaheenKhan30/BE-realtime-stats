import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WebSocketModule } from 'src/websockets/websocket.module';
import { BinanceService } from './binance.service';

@Module({
  imports: [ConfigModule, forwardRef(() => WebSocketModule)],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}