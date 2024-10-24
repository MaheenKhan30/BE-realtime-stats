import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BinanceService } from "./binance.service";
import { WebSocketModule } from "src/websockets-client/websocket.module";
@Module({
    imports:[ConfigModule, WebSocketModule],
    providers:[BinanceService],
    exports:[BinanceService]
})
export class BinanceModule {}