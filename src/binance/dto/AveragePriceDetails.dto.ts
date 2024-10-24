export class AveragePriceDetailsDto {
    eventType: string;
    symbol: string;
    avgPriceInterval: string;
    avgPriceUSD: number;
    avgPriceEUR?: number;
    avgPricePKR?: number;
    lastTradeTime: string;
    eventTime: string;
  }