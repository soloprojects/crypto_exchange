import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  logger: any;
  constructor(
    @InjectRepository(Currency)
    private currRepo: Repository<Currency>,
    private readonly httpService: HttpService,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    return await this.currRepo.save(createCurrencyDto);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async store() {
    const currArr: string[] = ['GBP', 'USD', 'EUR', 'CAD', 'NGN'];
    const coinLayerApi =
      'http://api.coinlayer.com/api/live?access_key=3b31eed0b62a50c8078926a860d52d98';
    for (const curr in currArr) {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(coinLayerApi + '&target=' + currArr[curr])
          .pipe(
            catchError((error: any) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );

      //console.log(data);
      if (data.success) {
        const createData = new CreateCurrencyDto();
        createData.target = data.target;
        createData.rates = JSON.stringify(data.rates);
        const checkData = await this.currRepo.findOne({
          where: {
            target: currArr[curr],
          },
          lock: { mode: 'optimistic', version: 1 },
        });

        if (checkData) {
          await this.currRepo.save({ id: checkData.id, createData });
        } else {
          await this.currRepo.save(createData);
        }
        //
      }
    }
  }

  async findAll(): Promise<Currency[]> {
    return await this.currRepo.find();
  }

  async findLastRow(): Promise<Currency[]> {
    return await this.currRepo.find({
      skip: 0,
      take: 1,
      order: { id: 'DESC' },
    });
  }

  async findOne(column: string, currency_from: string): Promise<Currency> {
    const result = await this.currRepo.findOne({
      where: {
        [column]: currency_from,
      },
    });
    return result;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} currency`;
  // }
}
