import { configureStore } from '@reduxjs/toolkit';

import currencyReducer from './features/crypto/currencySlice';
import exchangeReducer from './features/crypto/exchangeSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    exchange: exchangeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
