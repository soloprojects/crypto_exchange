import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  const useData = {
    target: 'USD',
    rates: {},
  };
  const mockCurrencyRepository = {
    find: jest.fn().mockImplementation(() => {
      return [
        {
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
      imports: [HttpModule],
      providers: [
        CurrencyService,
        {
          provide: getRepositoryToken(Currency),
          useValue: mockCurrencyRepository,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should select currency data', async () => {
    expect(await service.findAll()).toEqual([
      {
        created_at: new Date('2020-01-01'),
        updated_at: new Date('2020-01-01'),
        deleted_at: null,
        ...useData,
      },
    ]);
  });
});
