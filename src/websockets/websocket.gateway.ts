import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BinanceService } from 'src/binance/binance.service';
@WebSocketGateway()
export class WebsocketGateway implements OnModuleInit {
  constructor(
    private binanceService: BinanceService) {}
  @WebSocketServer() server: Server;
  onModuleInit() {
    this.server.on('connection', (client: Socket) => {
      console.log('Client connected:', client.id);
      
      setInterval(()=>{
        client.emit('avgPriceUpdate', this.binanceService.latestData)
      }, 30000)
    });
  }
  
  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
  }
}