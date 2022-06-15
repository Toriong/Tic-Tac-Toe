import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { Player} from '../interfaces/interfaces';


// this sets the value for the SettingsContext.Provider
export const SettingsContext = createContext({
    player1: {name: 'Player 1', isXChosen: false} as Partial<Player>,
    player2: {name: 'Player 2', isXChosen: false} as Partial<Player>,
    setPlayer1: {} as Dispatch<SetStateAction<Partial<Player>>>,
    setPlayer2: {} as Dispatch<SetStateAction<Partial<Player>>>,
});


export const SettingsProvider = ({ children, value = {name: '', isXChosen: false} as Player }: { children: ReactNode, value?: Partial<Player>}) => {
  const [player1, setPlayer1] = useState(value);
  const [player2, setPlayer2] = useState(value);
  return (
      <SettingsContext.Provider value={{
        player1, player2, setPlayer2, setPlayer1
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
