import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeModule } from './exchange/exchange.module';
import { CurrencyModule } from './currency/currency.module';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ScheduleModule.forRoot(),
    ExchangeModule,
    CurrencyModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
