
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


import { CurrencyService } from 'src/currency/currency.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class CurrenciesGateway implements OnModuleInit {
  constructor(private readonly currencyService: CurrencyService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('allCurrencies')
  async onAllCurrencies(@MessageBody() body: any) {
    const currencies = await this.currencyService.findAll();
    this.server.emit('onCurrencies', currencies);
  }
}
