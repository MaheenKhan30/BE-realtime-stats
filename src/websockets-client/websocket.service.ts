import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocket } from 'ws';

@Injectable()
export class WebsocketService implements OnModuleInit, OnModuleDestroy {
  private ws: WebSocket;
  private wsUrl: string;

  constructor(private configService: ConfigService) {
    this.wsUrl = this.configService.get<string>('BINANCE_WS_URL');
  }
  onModuleInit() {
    this.establishConnection();
  }

  onModuleDestroy() {
    this.ws.close();
  }

  private establishConnection() {
    const symbol = 'bnbbtc';
    const streamName = `${symbol}@trade`;
    const wsUrl = `${this.wsUrl}/${streamName}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.on('open', () => {
      console.log('Connected to Binance WebSocket');
      this.subscribeToTradeUpdates();
    });

    this.ws.on('message', (data: Buffer) => {
      const jsonString = data.toString();

      try {
        const jsonData = JSON.parse(jsonString);
        this.handleTradeMessage(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });

    this.ws.on('close', () => {
      console.log('Disconnected from Binance WebSocket');
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error.message);
    });
  }

  private subscribeToTradeUpdates() {
    const subscriptionMessage = JSON.stringify({
      method: 'SUBSCRIBE',
      params: ['bnbbtc@trade'],
      id: 1,
    });
    this.ws.send(subscriptionMessage);
  }

  private handleTradeMessage(data: any) {
    if (data.e === 'trade') {
      const tradeDetails = {
        eventType: data.e,
        eventTime: new Date(data.E),
        symbol: data.s,
        tradeId: data.t,
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        tradeTime: new Date(data.T),
        isMarketMaker: data.m,
      };
      console.log('Processed trade details:', tradeDetails);
    } else {
      console.log('Unknown event received:', data);
    }
  }
}