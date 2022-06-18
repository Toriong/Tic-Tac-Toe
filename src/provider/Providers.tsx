import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { CurrentTurn, Player} from '../interfaces/interfaces';


// this sets the value for the SettingsContext.Provider
export const SettingsContext = createContext({
    player1: {} as Partial<Player>,
    player2: {} as Partial<Player>,
    setPlayer1: {} as Dispatch<SetStateAction<Partial<Player>>>,
    setPlayer2: {} as Dispatch<SetStateAction<Partial<Player>>>,
});


export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const _player1 = localStorage.getItem('Player 1') && JSON.parse(localStorage.getItem('Player 1') as string);
    const _player2 = localStorage.getItem('Player 2') && JSON.parse(localStorage.getItem('Player 2') as string);
    const { name: player1Name, isXChosen: isXPlayer1 } = _player1 ?? {};
    const { name: player2Name, isXChosen: isXPlayer2 } = _player2 ?? {};
    const _defaultValPlayer1 = {isPlayer1: true, name: (player1Name || player1Name === "") ? player1Name : "Player 1", isXChosen: !!isXPlayer1}
    const _defaultValPlayer2 = { name: (player2Name || player2Name === "") ? player2Name : "Player 2", isXChosen: !!isXPlayer2}
    const [player1, setPlayer1] = useState(_defaultValPlayer1 as Object);
    const [player2, setPlayer2] = useState(_defaultValPlayer2 as Object);

  return (
    <SettingsContext.Provider value={{
        player1, player2, setPlayer2, setPlayer1
      }}>
      {children}
    </SettingsContext.Provider>
  );
};



export const GameContext = createContext({
    currentTurn: {} as Partial<CurrentTurn>,
    setCurrentTurn: {} as Dispatch<SetStateAction<Partial<CurrentTurn>>>,
});


export const GameProvider = ({children} : {children: ReactNode}) => {
  const currentTurnSavedVal = localStorage.getItem('currentTurn') && JSON.parse(localStorage.getItem('currentTurn') as string);
  const currentTurnDefaultVal = currentTurnSavedVal ?? { isPlayerOne: false, isPlayerTwo: false, isBot: false };
  const [currentTurn, setCurrentTurn] = useState(currentTurnDefaultVal as Object)
  
  return (
    <GameContext.Provider value={{currentTurn, setCurrentTurn}}>
        {children}
    </GameContext.Provider>
  )
}
