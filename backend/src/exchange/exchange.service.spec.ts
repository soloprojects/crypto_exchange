import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyService } from '../currency/currency.service';
import { CurrencyModule } from '../currency/currency.module';
import { Exchange } from './entities/exchange.entity';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [CurrencyModule],
      providers: [
        CurrencyService,
        ExchangeService,
        {
          provide: getRepositoryToken(Exchange),
          useValue: mockExchangeRepository,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
