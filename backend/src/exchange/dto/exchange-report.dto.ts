import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeReportDto {
  @ApiProperty({
    description: 'Exchange from date',
    example: '03-05-2022',
  })
  @IsNotEmpty()
  @IsString()
  public from_date: string;

  @ApiProperty({
    description: 'Exchange to date',
    example: '11-05-2022',
  })
  @IsNotEmpty()
  @IsString()
  public to_date: string;

  @ApiProperty({
    description: 'Exchange type',
    example: 'Live',
  })
  @IsNotEmpty()
  @IsString()
  public exchange_type: string;

  public page?: number;
  public limit?: number;
}
