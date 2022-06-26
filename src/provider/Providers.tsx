import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { CurrentTurn, GameObj, Player, VersusTypeSelectionObj } from '../interfaces/interfaces';
import { HookBooleanVal, StringState } from '../types/types';


export const SettingsContext = createContext({
  didErrorOccurPlayer1: false,
  didErrorOccurPlayer2: false,
  wasShapeBtnClicked: false,
  isSameName: false,
  player1: {} as Partial<Player>,
  player2: {} as Partial<Player>,
  bot: {} as Partial<Player>,
  currentNamePlayer1: "",
  currentNamePlayer2: "",
  versusType: {} as Partial<VersusTypeSelectionObj>,
  setWasShapeBtnClicked: {} as Function,
  setIsSameName: {} as Function,
  setDidErrorOccurPlayer1: {} as Function,
  setDidErrorOccurPlayer2: {} as Function,
  setPlayer1: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setPlayer2: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setBot: {} as Dispatch<SetStateAction<Partial<Player>>>,
  setVersusType: {} as Dispatch<SetStateAction<Partial<VersusTypeSelectionObj>>>,
  setCurrentNamePlayer1: {} as Function,
  setCurrentNamePlayer2: {} as Function,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const game: (null | GameObj) = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string);
  const versusTypeDefaultVal = game?.versusType ?? { isTwoPlayer: false, isBot: false };
  const { name: player1Name, isXChosen: isXPlayer1, spotsChosen: player1SpotsChosen } = game?.player1 ?? {};
  const { name: player2Name, isXChosen: isXPlayer2, spotsChosen: player2SpotsChosen } = game?.player2 ?? {};
  const _defaultValPlayer1 = { isPlayer1: true, name: (player1Name || player1Name === "") ? player1Name : "Player 1", isXChosen: !!isXPlayer1, spotsChosen: player1SpotsChosen ?? [] }
  const _defaultValPlayer2 = { name: (player2Name || player2Name === "") ? player2Name : "Player 2", isXChosen: !!isXPlayer2, spotsChosen: player2SpotsChosen ?? [] }
  const [versusType, setVersusType] = useState(versusTypeDefaultVal as Object);
  const [player1, setPlayer1] = useState(_defaultValPlayer1 as Object);
  const [player2, setPlayer2] = useState(_defaultValPlayer2 as Object);
  const [bot, setBot] = useState(game?.bot ?? {});
  const [currentNamePlayer1, setCurrentNamePlayer1]: StringState = useState("");
  const [currentNamePlayer2, setCurrentNamePlayer2]: StringState = useState("");
  const [wasShapeBtnClicked, setWasShapeBtnClicked]: HookBooleanVal = useState(false);
  const [didErrorOccurPlayer1, setDidErrorOccurPlayer1]: HookBooleanVal = useState(false)
  const [didErrorOccurPlayer2, setDidErrorOccurPlayer2]: HookBooleanVal = useState(false);
  const [isSameName, setIsSameName] = useState(false);

  return (
    <SettingsContext.Provider value={{
      bot, player1, player2, versusType, setPlayer2, setPlayer1, setVersusType, setBot, didErrorOccurPlayer2, setDidErrorOccurPlayer2, didErrorOccurPlayer1, setDidErrorOccurPlayer1, currentNamePlayer2, setCurrentNamePlayer2, currentNamePlayer1, setCurrentNamePlayer1, wasShapeBtnClicked, setWasShapeBtnClicked, isSameName, setIsSameName
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const GameContext = createContext({
  isStaleMate: false,
  isGameDone: false,
  isOnGameSec: false,
  redLine2ClassName: "",
  currentTurn: {} as Partial<CurrentTurn>,
  redLineClassName: "",
  setCurrentTurn: {} as Dispatch<SetStateAction<Partial<CurrentTurn>>>,
  setRedLine2ClassName: {} as Function,
  setIsGameDone: {} as Function,
  setIsStaleMate: {} as Function,
  setRedLineClassName: {} as Function,
  setIsOnGameSec: {} as Function
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const game: (null | GameObj) = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string);
  const currentTurnDefaultVal = game?.currentTurn ?? { isPlayerOne: false, isPlayerTwo: false, isBot: false };
  const [currentTurn, setCurrentTurn] = useState(currentTurnDefaultVal as Object);
  const [isStaleMate, setIsStaleMate]: HookBooleanVal = useState(!!game?.isStaleMate);
  const [isGameDone, setIsGameDone]: HookBooleanVal = useState(!!game?.isDone);
  const [isOnGameSec, setIsOnGameSec]: HookBooleanVal = useState(false);
  const [redLineClassName, setRedLineClassName]: StringState = useState("");
  const [redLine2ClassName, setRedLine2ClassName]: StringState = useState("")

  return (
    <GameContext.Provider value={{ currentTurn, redLine2ClassName, setCurrentTurn, isStaleMate, setIsStaleMate, isGameDone, setIsGameDone, redLineClassName, setRedLineClassName, isOnGameSec, setIsOnGameSec, setRedLine2ClassName }}>
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

export const LocationContext = createContext({
  currentLocation: 1,
  setCurrentLocation: {} as Function
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const game = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string)
  const [currentLocation, setCurrentLocation] = useState(game?.currentLocation ? game.currentLocation : 1)
  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

