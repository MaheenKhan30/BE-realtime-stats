import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { WebSocket } from 'ws';

import { AveragePriceEventMessageDto } from 'src/binance/dto/AveragePriceEventMessage.dto';
import { subscriptionMessageDto } from 'src/binance/dto/SubscriptionMessage.dto';

@Injectable()
export class WebsocketService implements OnModuleInit, OnModuleDestroy {
  private ws: WebSocket;

  onModuleInit() {}

  onModuleDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  }

  establishConnection(
    wsUrl: string,
    onMessage: (data: AveragePriceEventMessageDto) => void,
    onOpen: () => void,
  ) {
    this.ws = new WebSocket(wsUrl);

    this.ws.on('open', () => {
      console.log(`Connected to WebSocket: ${wsUrl}`);

      onOpen();
    });

    this.ws.on('message', (data: Buffer) => {
      const jsonString = data.toString();

      try {
        const jsonData = JSON.parse(jsonString);
        onMessage(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });

    this.ws.on('close', () => {
      console.log(`Disconnected from WebSocket: ${wsUrl}`);
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error.message);
    });
  }

  sendMessage(message: subscriptionMessageDto) {
    if (this.ws) {
      this.ws.send(JSON.stringify(message));
    }
  }
}