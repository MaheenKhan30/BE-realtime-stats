import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WebSocketModule } from './websockets/websocket.module';

import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [ConfigModule.forRoot(), WebSocketModule, BinanceModule],
})
export class AppModule {}
