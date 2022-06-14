import React, { useState, createContext } from 'react'

import { FC } from 'react';
import { Player, SettingsVal } from '../interfaces/interfaces';
import { PlayerState } from '../types/types';


export const SettingContext = createContext({});

interface ProviderProps{
    [key: string]: any
}

export const SettingProvider: FC<ProviderProps> = props => {
    const getPlayerDefaultVal = (isPlayerOne: Boolean = false) => {
    const playerDefaultVal:Player = isPlayerOne ? { isSquareChosen: false, name: 'Player 1' } : { isSquareChosen: false, name: 'Player 2' };
    return playerDefaultVal;
  }
  const [player1, setPlayer1]:PlayerState = useState(getPlayerDefaultVal(true));
  const [player2, setPlayer2]:PlayerState = useState(getPlayerDefaultVal());

    const settingsVal: SettingsVal = {
        _player1: [player1, setPlayer1],
        _player2: [player2, setPlayer2]
  }

    return (
        <SettingContext.Provider
            value={settingsVal}
        >
            {props.children}
        </SettingContext.Provider>
    )
}