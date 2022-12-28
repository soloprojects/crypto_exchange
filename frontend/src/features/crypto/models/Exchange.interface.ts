export interface ExchangeDto {
    currency_from?: string;
    currency_to?: string;
    exchange_type?: string;
    amount_from?: number|string;
    amount_to: number|string;
  }

  export interface ExchangeSearchDto {
    from_date: string;
    to_date: string;
    exchange_type: string;
    page?:number|string;
    limit?:number|string
  }

  export interface Exchange extends ExchangeDto {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  }