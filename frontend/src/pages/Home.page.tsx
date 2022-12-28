
import { useEffect, useState, useContext } from 'react';

import { Row, Col, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//@ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
//@ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
import { CurrencyState, getCurrencies, updateFromCurrency } from '../features/crypto/currencySlice';
import { createExchange, getExchanges, liveExchange, searchExchange } from '../features/crypto/exchangeSlice';
import { ExchangeDto } from '../features/crypto/models/Exchange.interface';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { WebsocketContext } from '../features/crypto/contexts/WebsocketContext';
import { Currency, CurrencyType } from '../features/crypto/models/Currency.interface';

const HomePage = () => {
  
  const socket = useContext(WebsocketContext);

  //GET CURRENCY AND CURRENCIES STATE USING REST API
  //const { currencies, currency } = useAppSelector((state) => state.currency);

  //GET CURRENCY AND CURRENCIES STATE
  const { exchanges, exchange } = useAppSelector((state) => state.exchange);

  const [form, setForm] = useState({amount_from: '0.00', amount_to: '0.00', currency_from: '0.00', currency_name_from:'', currency_to:'USD'});
  const [searchForm, setSearchForm] = useState({from_date: '', to_date: '', exchange_type: 'all', page: '0'});


  const [currencyState, setCurrencyState] = useState<CurrencyState>({
    currencies: [],
    currency: {
      target: '',
      rates: {}
    }
  });

  const dispatch = useAppDispatch();

  //USE WEBSOCKET TO FETCH CURRENCIES FROM BACKEND
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.emit('allCurrencies', 'Hello my guy');
    socket.on('onCurrencies', (data: Currency[]) => {      
      let singleData = {target: data[0].target, rates: data[0].rates};
      setCurrencyState({...currencyState, ['currencies']: data, ['currency']: singleData});      
    });
    return () => {
      socket.off('connect');
      socket.off('onCurrencies');
    };
  }, []);

  //FETCH EXCHANGES FROM BACKEND AND YOU CAN POSSIBLY FETCH CURRENCIES FROM BACKEND USING REST API
  useEffect(() => {
    //dispatch(getCurrencies());
    dispatch(getExchanges(0));
  }, []);

  //STYLE THE EXCHANGE TYPE COLUMN TEXT IN THE EXCHANGE DATA TABLE
  const formatStyle = (data:any, row:any) => {
    const inputStyle = (data === "Live Price") ? {color: 'green'} : {color: 'blue'};
     return <div style={inputStyle}>
      {data}
     </div>
  };

  //COLUMN REPRESENTATION IN THE BOOTSTRAP TABLE
  const columns: any = [{
    dataField: 'createdAt',
    text: 'Date & Time',
    sort: true,
  },
  {
    dataField: 'currency_from',
    text: 'Currency From',
    sort: true,
  },
  {
    dataField: 'amount_from',
    text: 'Amount 1',
    sort: true,
  },{
    dataField: 'currency_to',
    text: 'Currency To',
    sort: true,
  },{
    dataField: 'amount_to',
    text: 'Amount 2',
    sort: true,
  },{
    dataField: 'exchange_type',
    text: 'Type',
    sort: true,
    formatter:formatStyle,
  },
  ];  

  //BUILD THE DTO TO BE SUBMITTED TO BACKEND  
  const buildExchangeData: any = (formData:any, eType:string, currency_name_from:string = '', currency_from:string = '', amount_from:string = '', page = '0') => {

    const currencyNameFrom = (currency_name_from === '') ? formData.currency_name_from : currency_name_from;
    const currencyFrom = (currency_from === '') ? formData.currency_from : currency_from;
    const amountFrom = (amount_from === '') ? formData.amount_from : amount_from;     
    const amountTo =  parseFloat(amountFrom)* parseFloat(currencyFrom);
    
    const exchangeDto = {
      amount_from: amountFrom,
      amount_to: amountTo,
      currency_from: currencyNameFrom,
      currency_to: formData.currency_to,
      exchange_type: eType,
    };
    return exchangeDto;
};

//UPDATE FROM CURRENCY FIELD ON SELECT OF TO CURRENCY FIELD
const updateFromCurrencyField = (selectedCurrency:string): CurrencyType => {

  const currency = currencyState.currencies.find(
    (currency) => currency.target === selectedCurrency
  );

  if(currency){
    return {...currency};
  }else{
    return {target: '', rates: {}}
  }

}

  //HANDLE FORM SUBMIT FOR CREATING EXCHANGE
  const handleSubmit = () => {
     //SUBMIT FORM IF THE FOLLOWING CONDITIONS ARE MET
     if(parseFloat(form.amount_from) > 0 && parseFloat(form.currency_from) > 0){
      const exchangeDto: ExchangeDto = buildExchangeData(form, 'Exchanged','','',''); 
      dispatch(createExchange(exchangeDto));
  }
  }

  const handleSearchSubmit = () => {
    if(searchForm.from_date !== '' && searchForm.to_date !== ''){
      dispatch(searchExchange(searchForm));
    }
  }

  //MANAGES FORM INPUT EVENTS FOR EXCHANGE
  const setField = (e:any, name:string) => {

      if(name === 'currency_to'){
              
        setForm({...form, [name]: e.target.value, ['amount_from']: '0.00', ['amount_to']: '0.00', ['currency_from']: '0.00'});        
        let fromCurrency = updateFromCurrencyField(e.target.value);
        setCurrencyState({...currencyState, ['currency']: fromCurrency});

        //FETCH USING REST API
        //dispatch(updateFromCurrency(e.target.value)); 
      }

      if(name === 'amount_from'){     
        if(e.target.value !== ''){

         
          let result: number = parseFloat(form.currency_from) * parseFloat(e.target.value);
          //setForm({...form, [name]: e.target.value, ['amount_to']: String(result)});
          setForm({...form, [name]: e.target.value});
          
          //SUBMIT FORM IF THE FOLLOWING CONDITIONS ARE MET
          if(parseFloat(e.target.value) > 0 && parseFloat(form.currency_from) > 0){
              const exchangeDto: ExchangeDto = buildExchangeData(form, 'Live Price', '', '', e.target.value);
              dispatch(liveExchange(exchangeDto));
          }
        }
        
      }

      if(name === 'currency_from'){        
        const select = e.target;
        const currencyAmount: string = select.value;
        const currencyName: string = select.selectedOptions[0].text;

        let result: number = parseFloat(currencyAmount) * parseFloat(form.amount_from);          
        //setForm({...form, [name]: currencyAmount, ['currency_name_from']: currencyName, ['amount_to']: String(result)});
        setForm({...form, [name]: currencyAmount, ['currency_name_from']: currencyName});
        
        //SUBMIT FORM IF THE FOLLOWING CONDITIONS ARE MET
        if(parseFloat(form.amount_from) > 0 && parseFloat(currencyAmount) > 0){
          const exchangeDto: ExchangeDto = buildExchangeData(form,'Live Price', currencyName, currencyAmount, '');
          dispatch(liveExchange(exchangeDto));
        }

      }    

  }
  
  //MANAGES SEARCH FORM INPUT EVENTS
  const setSearchField = (e:any, name:string) => {

    setSearchForm({...searchForm, [name]: e.target.value});
    
    }    

  return (
    <div>
     <div className='card'>
      
        <div className="container">
          <p></p>
          <h3>Exchange</h3>
          <p></p>
            <div className="br"></div>
            <Form className="form-inline" >
              <Row className="d-flex align-items-end">
                <Form.Group as={Col} xs="{2}" md="auto" controlId="currency_from">
                  <Form.Label>Currency from</Form.Label>
                  <Form.Select placeholder="Select currency" name="currency_from" value={form.currency_from} onChange={(e) => setField(e,'currency_from')} className="mb-2">
                      <option value="0.00">Select</option>                 
                    {currencyState.currency.rates && Object.entries(currencyState.currency.rates).map(([key,value], index) => (
                      <option key={index} value={value}>
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="amount_from">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control value={form.amount_from} type='number' name='amount_from' onChange={(e) => setField(e,'amount_from')} className="mb-2"/>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="currency_to">
                  <Form.Label>Currency to</Form.Label>
                  <Form.Select placeholder="Select Currency" value={form.currency_to} name='currency_to' onChange={(e) => setField(e, 'currency_to')} className="mb-2">
                    
                    {currencyState.currencies.map((item, index) => (
                    <option key={index} value={item.target}>
                      {item.target}
                    </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="amount_to">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control value={exchange.amount_to} disabled type="number" onChange={(e) => setField(e, 'amount_to')} className="mb-2"/>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="save">          
                  
                  <Button variant="success" type="button" onClick={handleSubmit} className="mb-2">
                    Save
                  </Button>
                </Form.Group>
              </Row>
            </Form>
        </div>

      </div>      
   
      <div className='card'>
      
        <div className="container">
          <p></p>
          <h4>History</h4>
          <p></p>
            
            <Form className="form-inline" >
              <Row className="d-flex align-items-end">
                <Form.Group as={Col} xs="{2}" md="auto" controlId="fromDate">
                  <Form.Label>From date</Form.Label>
                  <Form.Control type="date" value={searchForm.from_date} onChange={(e) => setSearchField(e,'from_date')} className="mb-2"/>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="toDate">
                  <Form.Label>To date</Form.Label>
                  <Form.Control type="date" value={searchForm.to_date} onChange={(e) => setSearchField(e,'to_date')} className="mb-2"/>
                </Form.Group>

                <Form.Group as={Col} xs="{2}"  md="auto" controlId="formGridState">
                  <Form.Label>Type</Form.Label>
                  <Form.Select value={searchForm.exchange_type} onChange={(e) => setSearchField(e,'exchange_type')} className="mb-2">
                    <option value="all">All</option>
                    <option value="Live Price">Live Price</option>
                    <option value="Exchanged">Exchange</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} xs="{2}" md="auto" controlId="formGridZip">          
                  
                  <Button variant="outline-dark" type="button" onClick={handleSearchSubmit} className="mb-2">
                    Filter
                  </Button>
                </Form.Group>
              </Row>
            </Form>
        </div>

        <div className='container'>
          <p></p>
          <BootstrapTable 
          keyField="id" 
          data={exchanges} 
          columns={columns} 
          pagination={paginationFactory()} 
          bordered={ false } 
          defaultSortDirection="desc" 
          striped 
          hover 
          condensed />
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table> */}
        </div>
        

    </div> 

    </div>
  );
};

export default HomePage;
