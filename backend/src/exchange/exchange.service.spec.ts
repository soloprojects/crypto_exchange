import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyService } from '../currency/currency.service';
import { Exchange } from './entities/exchange.entity';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currencyService: CurrencyService;

  const useData = {
    currency_from: 'BTC',
    currency_to: 'USD',
    amount_from: 2,
    amount_to: 32000,
    exchange_type: 'Live',
  };

  const mockExchangeRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((Exchange) => {
      return Promise.resolve({
        id: Date.now(),
        created_at: new Date('2020-01-01'),
        updated_at: new Date('2020-01-01'),
        deleted_at: null,
        ...Exchange,
      });
    }),
  };

  const mockCurrencyService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: getRepositoryToken(Exchange),
          useValue: mockExchangeRepository,
        },
        {
          provide: CurrencyService,
          useValue: mockCurrencyService,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(currencyService).toBeDefined();
  });

  it('Should select paginated Exchange data', async () => {
    expect(await service.create(useData)).toEqual({
      id: Date.now(),
      created_at: new Date('2020-01-01'),
      updated_at: new Date('2020-01-01'),
      deleted_at: null,
      ...useData,
    });

    expect(mockExchangeRepository.create).toBeDefined();
  });
});
