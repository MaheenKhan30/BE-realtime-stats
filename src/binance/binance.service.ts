import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import formatTimestamp from 'src/utils/formatTimestamp';
import { exchangeRates } from 'src/utils/constants';
import { WebsocketService } from 'src/websockets/websocket.service';

@Injectable()
export class BinanceService {
  private wsUrl: string;
  private exchangeRates: Record<string, number>;
  public latestData: any
  constructor(
    private websocketService: WebsocketService,
    private configService: ConfigService,
  ) {
    this.wsUrl = this.configService.get<string>('BINANCE_WS_URL');
    this.exchangeRates = exchangeRates
    this.connectToAvgPriceStream('BTCUSDT');
  }

  connectToAvgPriceStream(symbol: string) {
    const streamName = `${symbol}@avgPrice`;
    const fullWsUrl = `${this.wsUrl}/${streamName}`;

    return this.websocketService.establishConnection(
      fullWsUrl,
      (data) => {
        this.handleAvgPriceMessage(data);
      },
      () => this.subscribeToAvgPriceStream(),
    );
  }

  private subscribeToAvgPriceStream() {
    const subscriptionMessage = {
      method: 'SUBSCRIBE',
      params: [`btcusdt@avgPrice`],
      id: 2,
    };
    this.websocketService.sendMessage(subscriptionMessage);
  }

  private handleAvgPriceMessage(data: any) {
    if (data.e === 'avgPrice') {
      const priceDetails : any= {
        eventType: data.e,
        symbol: data.s,
        avgPriceInterval: data.i,
        avgPriceUSD: Number(data.w),
        lastTradeTime: formatTimestamp(data.T),
      };
      const convertedPrices = this.convertCurrencies(priceDetails.avgPriceUSD);
      priceDetails.avgPriceEUR = convertedPrices.EUR;
      priceDetails.avgPricePKR = convertedPrices.PKR;
      console.log('Received average price data:', priceDetails);
    this.latestData = priceDetails
    } else {
      console.log('Unknown avg price event received:', data);
    }
  }

  convertCurrencies(baseValue: number): Record<string, number> {
    const conversions: Record<string, number> = {};

    for (const [currency, rate] of Object.entries(this.exchangeRates)) {
        conversions[currency] = baseValue * rate;
      
    }

    return conversions;
  }
}