import { Module } from '@nestjs/common';
import { CurrenciesGateway } from './currencies.gateway';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [CurrencyModule],
  providers: [CurrenciesGateway],
})
export class CurrenciesModule {}
