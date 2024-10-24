import { forwardRef, Module } from "@nestjs/common";
import { BinanceService } from "./binance.service";
import { ConfigModule } from "@nestjs/config";
import { WebSocketModule } from "src/websockets/websocket.module";

@Module({
    imports:[ConfigModule, forwardRef(() => WebSocketModule)],
    providers:[BinanceService],
    exports:[BinanceService]
})
export class BinanceModule {}