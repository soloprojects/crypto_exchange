import axios from 'axios';

import { Currency } from '../models/Currency.interface';

const getCurrencies = async () => {
  const response = await axios.get<Currency[]>(
    `${process.env.REACT_APP_BASE_API}/currency/all`
  );

  return response;
};

const currencyService = {
  getCurrencies,
};

export default currencyService;
