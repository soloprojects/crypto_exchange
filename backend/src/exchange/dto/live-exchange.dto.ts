import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LiveExchangeDto {
  @ApiProperty({
    description: 'Exchange from currency',
    example: 'BTC',
  })
  @IsNotEmpty()
  @IsString()
  public currency_from: string;

  @ApiProperty({
    description: 'Exchange to currency',
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  public currency_to: string;

  @ApiProperty({
    description: 'Exchange Amount from',
    example: '4',
  })
  @IsNotEmpty()
  public amount_from: string;

  @ApiProperty({
    description: 'Exchange Amount to',
    example: '20000',
  })
  @IsNotEmpty()
  public amount_to?: number | string;

  @ApiProperty({
    description: 'Exchange type',
    example: 'Live Price',
  })
  @IsNotEmpty()
  @IsString()
  public exchange_type: string;
}
