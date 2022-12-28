import React from 'react';
import logo from './logo.svg';
import './App.css';
import { socket, WebsocketProvider } from './features/crypto/contexts/WebsocketContext';
import HomePage from './pages/Home.page';

function App() {
  return (
    <WebsocketProvider value={socket}>
      <HomePage />
    </WebsocketProvider>
  );
}

export default App;
