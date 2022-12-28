import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from '../currency/currency.service';
import { CurrencyModule } from '../currency/currency.module';
import { Exchange } from './entities/exchange.entity';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

describe('ExchangeController', () => {
  let controller: ExchangeController;

  const useData = {
    currency_from: 'BTC',
    currency_to: 'USD',
    amount_from: 2,
    amount_to: 32000,
    exchange_type: 'Live',
  };

  const mockExchangeService = {
    create: jest.fn((dto) => {
      return {
        id: expect.any(Number),
        created_at: new Date('2020-01-01'),
        updated_at: new Date('2020-01-01'),
        deleted_at: null,
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: Date.now(),
          created_at: new Date('2020-01-01'),
          updated_at: new Date('2020-01-01'),
          deleted_at: null,
          ...useData,
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [CurrencyModule],
      controllers: [ExchangeController],
      providers: [ExchangeService],
    })
      .overrideProvider(ExchangeService)
      .useValue(mockExchangeService)
      .compile();

    controller = module.get<ExchangeController>(ExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create an exchange', () => {
    expect(controller.create(useData)).toEqual({
      id: expect.any(Number),
      created_at: new Date('2020-01-01'),
      updated_at: new Date('2020-01-01'),
      deleted_at: null,
      ...useData,
    });

    expect(mockExchangeService.create).toHaveBeenCalledWith(useData);
  });

  it('Should select paginated exchange data', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: expect.any(Number),
        created_at: new Date('2020-01-01'),
        updated_at: new Date('2020-01-01'),
        deleted_at: null,
        ...useData,
      },
    ]);

    expect(mockExchangeService.findAll).toBeDefined();
  });
});
