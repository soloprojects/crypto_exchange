import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currency, CurrencyDto, CurrencyType } from './models/Currency.interface';
import currencyService from './services/currency.service';

export {};

interface AsyncState {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export interface CurrencyState extends AsyncState {
  currencies: Currency[];
  currency: CurrencyType;
}

const initialState: CurrencyState = {
  currencies: [],
  currency: {
    target: '',
    rates: {}
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//REST SERVICE
const updateFromCurrencyField = (selectedCurrency:string, currencies:Currency[]): CurrencyType => {

  const currency = currencies.find(
    (currency) => currency.target === selectedCurrency
  );

  if(currency){
    return {...currency};
  }else{
    return {target: '', rates: {}}
  }

}

export const getCurrencies = createAsyncThunk('currency', async () => {
  try {
    const data = await currencyService.getCurrencies();
    //console.log('Error: ', data);
    return data;
   
  } catch (error) {
    //console.log('Error: ', error);
  }
});

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    updateFromCurrency: (state, action: PayloadAction<string>) => {
      const update = updateFromCurrencyField(
        action.payload,
        state.currencies,
      );
      state.currency = update;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currencies = action.payload?.data || [];
        state.currency = {target: action.payload?.data[0].target, rates: action.payload?.data[0].rates} || {target: '', rates: {}};
      })
      .addCase(getCurrencies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.currencies = [];
      });
  },
});

export const { reset, updateFromCurrency } =
  currencySlice.actions;

export default currencySlice.reducer;
