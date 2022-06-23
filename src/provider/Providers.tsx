import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { CurrentTurn, Player, VersusTypeSelectionObj } from '../interfaces/interfaces';
import { HookBooleanVal, ObjectState, StringState } from '../types/types';


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
  isStaleMate: false,
  isGameDone: false,
  isOnGameSec: false,
  isGameBeingPlayed: false,
  currentTurn: {} as Partial<CurrentTurn>,
  winningListName: "" as String,
  setCurrentTurn: {} as Dispatch<SetStateAction<Partial<CurrentTurn>>>,
  setIsGameDone: {} as Function,
  setIsStaleMate: {} as Function,
  setWinningListName: {} as Function,
  setIsOnGameSec: {} as Function,
  setIsGameBeingPlayed: {} as Function
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const currentTurnSavedVal = localStorage.getItem('currentTurn') && JSON.parse(localStorage.getItem('currentTurn') as string);
  const currentTurnDefaultVal = currentTurnSavedVal ?? { isPlayerOne: false, isPlayerTwo: false, isBot: false };
  const _isGameBeingPlayed = localStorage.getItem('isGameBeingPlayed') && JSON.parse(localStorage.getItem('isGameBeingPlayed') as string)
  const [currentTurn, setCurrentTurn] = useState(currentTurnDefaultVal as Object);
  const [isStaleMate, setIsStaleMate]: HookBooleanVal = useState(localStorage.getItem('isStaleMate') ? JSON.parse(localStorage.getItem('isStaleMate') as string) as boolean : false);
  const [isGameDone, setIsGameDone]: HookBooleanVal = useState(false);
  const [isGameBeingPlayed, setIsGameBeingPlayed]: HookBooleanVal = useState(!!_isGameBeingPlayed);
  const [isOnGameSec, setIsOnGameSec]: HookBooleanVal = useState(false);
  const [winningListName, setWinningListName]: StringState = useState("");

  return (
    <GameContext.Provider value={{ currentTurn, setCurrentTurn, isStaleMate, setIsStaleMate, isGameDone, setIsGameDone, winningListName, setWinningListName, isOnGameSec, setIsOnGameSec, isGameBeingPlayed, setIsGameBeingPlayed }}>
      {children}
    </GameContext.Provider>
  )
}

export const ModalContext = createContext({
  isResultModalOn: false,
  isSideModalOn: false,
  isGameOnNotifyModalOn: false,
  setIsGameOnNotifyModalOn: {} as Function,
  setIsResultModalOn: {} as Function,
  setIsSideModalOn: {} as Function,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isResultModalOn, setIsResultModalOn]: HookBooleanVal = useState(false);
  const [isSideModalOn, setIsSideModalOn]: HookBooleanVal = useState(false);
  const [isGameOnNotifyModalOn, setIsGameOnNotifyModalOn]: HookBooleanVal = useState(false);

  return (
    <ModalContext.Provider value={{ isResultModalOn, setIsResultModalOn, isSideModalOn, setIsSideModalOn, isGameOnNotifyModalOn, setIsGameOnNotifyModalOn }}>
      {children}
    </ModalContext.Provider>
  )
}

