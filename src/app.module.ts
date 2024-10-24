import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebSocketModule } from './websockets-client/websocket.module';

@Module({
  imports: [ConfigModule.forRoot(),WebSocketModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}