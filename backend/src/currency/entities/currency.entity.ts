import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('currency')
export class Currency {
  @ApiProperty({ description: 'Primary key as Currency ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'The currency unique identifier',
  })
  id: number;

  @ApiProperty({
    description: 'Title of target currency',
    example: 'USD',
  })
  @Column({
    type: 'varchar',
  })
  target: string;

  @ApiProperty({
    description: 'Currency equivalents',
    example: 'BTC',
  })
  @Column({
    type: 'text',
  })
  rates: string;

  @ApiProperty({
    description: 'Created at',
    example: 'Date time',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: 'Date time',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: 'Date time',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  updateRates() {
    this.rates = JSON.parse(this.rates);
  }
}
