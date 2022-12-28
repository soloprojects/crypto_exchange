import axios from 'axios';

import { Exchange, ExchangeDto, ExchangeSearchDto } from '../models/Exchange.interface';

const limit:number = 100000;

const getExchanges = async (page:number) => {
  const response = await axios.get<Exchange[]>(
    `${process.env.REACT_APP_BASE_API}/exchange/all?page=${page}&limit=${limit}`
  );

  return response;
};

const createExchange = async (newExchange: ExchangeDto): Promise<Exchange> => {
    console.log(newExchange);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/exchange/create`,
      newExchange
    );
  
    return response.data;
  };

  const liveExchange = async (newExchange: ExchangeDto): Promise<Exchange> => {
    console.log(newExchange);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/exchange/live`,
      newExchange
    );
  
    return response.data;
  };

const searchExchange = async (searchExchange: ExchangeSearchDto,): Promise<Exchange[]> => {
const response = await axios.get<Exchange[]>(
    `${process.env.REACT_APP_BASE_API}/exchange/search?page=${searchExchange.page}&limit=${limit}&from_date=${searchExchange.from_date}&to_date=${searchExchange.to_date}&exchange_type=${searchExchange.exchange_type}`,
    
);

return response.data;
};

const exchangeService = {
  getExchanges,
  createExchange,
  liveExchange,
  searchExchange,
};

export default exchangeService;
