import React, {  Dispatch, SetStateAction } from 'react'
import { HookBooleanVal, PlayerState, VersusTypeSelection } from "../types/types";


export interface VersusTypeProps{
    _versusTypeSelection: VersusTypeSelection
}

export interface VersusTypeSelectionObj{
    isTwoPlayer: Boolean,
    isBot: Boolean
}


export interface DirectionBtnsProps{
    _isBackBtnDisabled: HookBooleanVal,
    _isForwardBtnDisabled: HookBooleanVal,
    _compRenderToggle: HookBooleanVal
}

export interface DisabledBtnStyle{
    color: String,
    border: String
}

export interface UseGetPathVals{
    isOnVersusSelection: Boolean,
    isOnPlayerInfo: Boolean
}

export interface Player{
    isXChosen?: Boolean,
    name?: String
}

export interface SettingsVal{
    _player1: PlayerState,
    _player2: PlayerState
}


// GOAL: pass down the name of the player and if the player has chosen square
export interface PlayerInfoProps{
    player: Player,
    setPlayer: Dispatch<SetStateAction<Partial<Player>>>,
    isPlayer1: Boolean
}

export interface PlayerInfoSecProps{
    isTwoPlayer: Boolean,
}


