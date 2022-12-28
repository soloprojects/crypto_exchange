import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Between, Repository } from 'typeorm';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { ExchangeReportDto } from './dto/exchange-report.dto';
import { PaginateExchangeDto } from './dto/paginate-exchange.dto';
import { LiveExchangeDto } from './dto/live-exchange.dto';
import { Exchange } from './entities/exchange.entity';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepo: Repository<Exchange>,
    private currencyService: CurrencyService,
  ) {}

  create(createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    const createData = this.exchangeRepo.create(createExchangeDto);
    return this.exchangeRepo.save(createData);
  }

  async liveExchange(liveExchangeDto: LiveExchangeDto): Promise<Exchange> {
    const amountFrom: number = parseFloat(liveExchangeDto.amount_from);
    const cryptoCurr = await this.currencyService.findOne(
      'target',
      liveExchangeDto.currency_to,
    );

    const rates = cryptoCurr.rates;

    for (const [key, value] of Object.entries(rates)) {
      if (key === liveExchangeDto.currency_from) {
        liveExchangeDto.amount_to = amountFrom * parseFloat(value);
        break;
      }
    }

    const createData = this.exchangeRepo.create(liveExchangeDto);
    return this.exchangeRepo.save(createData);
  }

  convertDate(dateInput: string): Date {
    // const newDate = new Date(
    //   Number(myDate[2]),
    //   Number(myDate[1]) - 1,
    //   Number(myDate[0]) + 1,
    // );
    const myDate = dateInput.split('-');
    const newDate = new Date(
      Number(myDate[0]),
      Number(myDate[1]) - 1,
      Number(myDate[2]) + 1,
    );
    console.log(newDate);
    return newDate;
  }

  async findAll({ page, limit }: PaginateExchangeDto): Promise<Exchange[]> {
    return await this.exchangeRepo.find({
      order: {
        id: 'DESC',
      },
      skip: page,
      take: limit,
    });
  }
  async findAllReport(
    { page, limit }: PaginateExchangeDto,
    fromdate,
    todate,
    exchange_type,
  ): Promise<Exchange[]> {
    const from_date = this.convertDate(fromdate);
    const to_date = this.convertDate(todate);

    if (exchange_type === 'all') {
      return await this.exchangeRepo.find({
        where: {
          createdAt: Between(from_date, to_date),
        },
        order: {
          id: 'DESC',
        },
        skip: page,
        take: limit,
      });
    }
    return await this.exchangeRepo.find({
      where: {
        exchange_type: exchange_type,
        createdAt: Between(from_date, to_date),
      },
      order: {
        id: 'DESC',
      },
      skip: page,
      take: limit,
    });
  }
}
