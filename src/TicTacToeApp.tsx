import React from 'react';
import TicTacToePage from './components/TicTacToePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from './provider/Providers';


// if there are no users in the local storage, then that means a game is not being played. If that is the case, then take the user back to the home page 
const TicTacToeApp = () => {
  return (  
    <BrowserRouter>
      <SettingsProvider>
    <Routes>
      <Route path='/game' element={<TicTacToePage/>}/>
      <Route path='/playerInfo' element={<TicTacToePage/>}/>
      <Route path='/' element={<TicTacToePage/>}/>
      <Route path='*' element={<TicTacToePage/>}/>
    </Routes>
    </SettingsProvider>
    </BrowserRouter>
  );
}

export default TicTacToeApp;