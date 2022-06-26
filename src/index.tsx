import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TicTacToeApp from './TicTacToeApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TicTacToeApp />
  </React.StrictMode>
);

reportWebVitals();
