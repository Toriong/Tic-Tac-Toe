import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { CurrentTurn, Player, VersusTypeSelectionObj } from '../interfaces/interfaces';


// this sets the value for the SettingsContext.Provider
export const SettingsContext = createContext({
  player1: {} as Partial<Player>,
  player2: {} as Partial<Player>,
  bot: {} as Partial<Player>,
  versusType: {} as Partial<VersusTypeSelectionObj>,
  setPlayer1: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setPlayer2: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setBot: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setVersusType: {} as Dispatch<SetStateAction<Partial<VersusTypeSelectionObj>>>

});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const _player1 = localStorage.getItem('Player 1') && JSON.parse(localStorage.getItem('Player 1') as string);
  const _player2 = localStorage.getItem('Player 2') && JSON.parse(localStorage.getItem('Player 2') as string);
  const _botSavedVal = localStorage.getItem('Bot') && JSON.parse(localStorage.getItem('Bot') as string);
  const _versusTypeSavedVal = localStorage.getItem('versusType') && JSON.parse(localStorage.getItem('versusType') as string);
  const versusTypeDefaultVal = _versusTypeSavedVal ?? { isTwoPlayer: false, isBot: false };
  const { name: player1Name, isXChosen: isXPlayer1, spotsChosen: player1SpotsChosen } = _player1 ?? {};
  const { name: player2Name, isXChosen: isXPlayer2, spotsChosen: player2SpotsChosen } = _player2 ?? {};
  const _defaultValPlayer1 = { isPlayer1: true, name: (player1Name || player1Name === "") ? player1Name : "Player 1", isXChosen: !!isXPlayer1, spotsChosen: player1SpotsChosen ?? [] }
  const _defaultValPlayer2 = { name: (player2Name || player2Name === "") ? player2Name : "Player 2", isXChosen: !!isXPlayer2, spotsChosen: player2SpotsChosen ?? [] }
  const [versusType, setVersusType] = useState(versusTypeDefaultVal as Object);
  const [player1, setPlayer1] = useState(_defaultValPlayer1 as Object);
  const [player2, setPlayer2] = useState(_defaultValPlayer2 as Object);
  const [bot, setBot] = useState(_botSavedVal as Object);

  return (
    <SettingsContext.Provider value={{
      bot, player1, player2, versusType, setPlayer2, setPlayer1, setVersusType, setBot
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const GameContext = createContext({
  currentTurn: {} as Partial<CurrentTurn>,
  setCurrentTurn: {} as Dispatch<SetStateAction<Partial<CurrentTurn>>>,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const currentTurnSavedVal = localStorage.getItem('currentTurn') && JSON.parse(localStorage.getItem('currentTurn') as string);
  const currentTurnDefaultVal = currentTurnSavedVal ?? { isPlayerOne: false, isPlayerTwo: false, isBot: false };
  const [currentTurn, setCurrentTurn] = useState(currentTurnDefaultVal as Object)

  return (
    <GameContext.Provider value={{ currentTurn, setCurrentTurn }}>
      {children}
    </GameContext.Provider>
  )
}
