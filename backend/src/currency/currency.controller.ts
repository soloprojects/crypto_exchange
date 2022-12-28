import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('create')
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @ApiOkResponse({
    description: 'The currency rates that got created',
    type: Currency,
  })
  @Get('/all')
  findAll(): Promise<Currency[]> {
    return this.currencyService.findAll();
  }

  @ApiOkResponse({
    description: 'The last currency rates that got created',
    type: Currency,
  })
  @Get('/last')
  findLastRow(): Promise<Currency[]> {
    return this.currencyService.findLastRow();
  }
}
