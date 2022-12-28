import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  const useData = {
    target: 'USD',
    rates: {},
  };

  const mockCurrencyService = {
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
      controllers: [CurrencyController],
      providers: [CurrencyService],
    })
      .overrideProvider(CurrencyService)
      .useValue(mockCurrencyService)
      .compile();

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should select all currency data', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: expect.any(Number),
        created_at: new Date('2020-01-01'),
        updated_at: new Date('2020-01-01'),
        deleted_at: null,
        ...useData,
      },
    ]);

    expect(mockCurrencyService.findAll).toBeDefined();
  });

});
