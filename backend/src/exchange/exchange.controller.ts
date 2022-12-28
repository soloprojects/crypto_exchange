import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { LiveExchangeDto } from './dto/live-exchange.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Exchange } from './entities/exchange.entity';
import { PaginateExchangeDto } from './dto/paginate-exchange.dto';
import { ExchangeReportDto } from './dto/exchange-report.dto';

@ApiTags('Exchange')
@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @ApiCreatedResponse({
    description: 'Create Exchange',
    type: Exchange,
  })
  @UsePipes(ValidationPipe)
  @Post('/create')
  create(@Body() createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    return this.exchangeService.create(createExchangeDto);
  }

  @ApiCreatedResponse({
    description: 'Create Live Price',
    type: Exchange,
  })
  @UsePipes(ValidationPipe)
  @Post('/live')
  liveExchange(@Body() liveExchangeDto: LiveExchangeDto): Promise<Exchange> {
    return this.exchangeService.liveExchange(liveExchangeDto);
  }

  @ApiOkResponse({ description: 'Get all Exchanges', type: Exchange })
  @Get('/all')
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(100000), ParseIntPipe)
    limit = 100000,
  ): Promise<Exchange[]> {
    const options: PaginateExchangeDto = {
      page,
      limit,
    };
    return this.exchangeService.findAll(options);
  }

  @ApiOkResponse({ description: 'Get searched Exchanges', type: Exchange })
  @UsePipes(ValidationPipe)
  @Get('/search')
  findAllReport(
    @Query('from_date') from_date,
    @Query('to_date') to_date,
    @Query('exchange_type') exchange_type,
    @Query('limit', new DefaultValuePipe(100000), ParseIntPipe) limit = 100000,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
  ): Promise<Exchange[]> {    
    const options: PaginateExchangeDto = {
      page,
      limit,
    };
    return this.exchangeService.findAllReport(
      options,
      from_date,
      to_date,
      exchange_type,
    );
  }
}
