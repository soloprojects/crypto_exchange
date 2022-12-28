import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchange } from './entities/exchange.entity';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange]), CurrencyModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
