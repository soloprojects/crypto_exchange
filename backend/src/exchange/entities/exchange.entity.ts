import { ApiProperty } from '@nestjs/swagger';
import { format } from 'date-fns';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UrlWithStringQuery } from 'url';

@Entity('exchange')
export class Exchange {
  @ApiProperty({ description: 'Primary key as Exchange ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'The exchange unique identifier',
  })
  id: number;

  @ApiProperty({
    description: 'Currency from',
    example: 'BTC',
  })
  @Column({
    type: 'varchar',
  })
  currency_from: string;

  @ApiProperty({
    description: 'Currency to',
    example: 'USD',
  })
  @Column({
    type: 'varchar',
  })
  currency_to: string;

  @ApiProperty({
    description: 'stores conversion type',
    example: 'Live rate',
  })
  @Column({
    type: 'varchar',
  })
  exchange_type: string;

  @ApiProperty({
    description: 'From Amount',
    example: '3',
  })
  @Column({
    type: 'varchar',
  })
  amount_from: number | string;

  @ApiProperty({
    description: 'To Amount',
    example: '48,000',
  })
  @Column({
    type: 'varchar',
  })
  amount_to: number | string;

  @ApiProperty({
    description: 'Created at',
    example: 'Date time',
  })
  @CreateDateColumn()
  createdAt: Date | string;

  @ApiProperty({
    description: 'Updated at',
    example: 'Date time',
  })
  @UpdateDateColumn()
  updatedAt: Date | string;

  @ApiProperty({
    description: 'Deleted at',
    example: 'Date time',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  convertDecimalToNumber() {
    this.amount_from = this.amount_from
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.amount_to = this.amount_to
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    this.createdAt = format(new Date(this.createdAt), 'yyyy-MM-dd HH:MM:SS');
    this.updatedAt = format(new Date(this.updatedAt), 'yyyy-MM-dd HH:MM:SS');
  }

  @BeforeInsert()
  convertDecimalToString() {
    this.amount_from = String(this.amount_from);
    this.amount_to = String(this.amount_to);
  }
}
