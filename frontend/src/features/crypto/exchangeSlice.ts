import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Exchange, ExchangeDto, ExchangeSearchDto } from './models/Exchange.interface';
import exchangeService from './services/exchange.service';

export {};

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ExchangeState extends AsyncState {
  exchanges: Exchange[],
  exchange: Exchange;
}

const initialState: ExchangeState = {
  exchanges: [],
  exchange: {
    amount_to: '0.00',
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getExchanges = createAsyncThunk('exchange/all', async (page:number, thunkAPI) => {
  try {
    return await exchangeService.getExchanges(page);
  } catch (error) {
    console.log('Error: ', error);
    return thunkAPI.rejectWithValue('Unable to create!');
  }
});

export const createExchange = createAsyncThunk(
    'exchange/create',
    async (newExchange: ExchangeDto, thunkAPI) => {
      try {
        const result = await exchangeService.createExchange(newExchange);
        return result
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to create!');
      }
    }
  );

  export const liveExchange = createAsyncThunk(
    'exchange/live',
    async (newExchange: ExchangeDto, thunkAPI) => {
      try {
        const result = await exchangeService.liveExchange(newExchange);
        return result
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to create!');
      }
    }
  );

  export const searchExchange = createAsyncThunk(
    'exchange/search',
    async (searchExchange: ExchangeSearchDto, thunkAPI) => {
      try {
        return await exchangeService.searchExchange(searchExchange);
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to create!');
      }
    }
  );

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExchanges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exchanges = action.payload?.data || [];
      })
      .addCase(getExchanges.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.exchanges = [];
      })
      .addCase(createExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exchange = action.payload;
        state.exchanges.unshift(action.payload);
      })
      .addCase(createExchange.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.exchange = {amount_to: '0.00'};
      })
      .addCase(liveExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(liveExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exchange = action.payload;
        state.exchanges.unshift(action.payload);
      })
      .addCase(liveExchange.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.exchange = {amount_to: '0.00'};
      })
      .addCase(searchExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exchanges = action.payload;
      })
      .addCase(searchExchange.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.exchange = {amount_to: '0.00'};
      });
  },
});

export const { reset } =
  exchangeSlice.actions;

export default exchangeSlice.reducer;
