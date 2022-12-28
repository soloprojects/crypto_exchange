
export interface CurrencyDto {
  target: string;
  rates: object;
}

export interface Currency extends CurrencyDto {
    id: number;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
  }

export type CurrencyType = {
  target: string | undefined;
  rates: object | undefined;
  }

  