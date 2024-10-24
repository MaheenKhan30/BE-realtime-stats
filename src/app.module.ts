import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebSocketModule } from './websockets-client/websocket.module';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [ConfigModule.forRoot(),WebSocketModule, BinanceModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}