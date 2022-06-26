import React from 'react';
import TicTacToePage from './components/TicTacToePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider, LocationProvider, ModalProvider, SettingsProvider } from './provider/Providers';
import Navbar from './components/Navbar';
import Blocker from './components/Blocker';

const TicTacToeApp = () => {
  return (
    <BrowserRouter>
      <LocationProvider>
        <ModalProvider>
          <GameProvider>
            <SettingsProvider>
              <Blocker />
              <Navbar />
              <Routes>
                <Route path='/' element={<TicTacToePage />} />
                <Route path='*' element={<TicTacToePage didErrorOccur={true} />} />
              </Routes>
            </SettingsProvider>
          </GameProvider>
        </ModalProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default TicTacToeApp;
