import React, { Dispatch, SetStateAction } from 'react'
import VersusType from '../components/gameSettings/VersusType';
import { HookBooleanVal, PlayerState, VersusTypeSelection } from "../types/types";


export interface VersusTypeProps {
    _versusTypeSelection: VersusTypeSelection
}

export interface VersusTypeSelectionObj {
    isTwoPlayer: Boolean,
    isBot: Boolean
}


export interface DirectionBtnsProps {
    _isBackBtnDisabled: HookBooleanVal,
    _isForwardBtnDisabled: HookBooleanVal,
    _compRenderToggle: HookBooleanVal
}

export interface RedLineProps {
    redLineClassName?: String,
    redLine2ClassName?: String,
    isRedLine1?: true | boolean
}

export interface DisabledBtnStyle {
    color: String,
    border: String
}

export interface UseGetPathVals {
    isOnVersusSelection: Boolean,
    isOnPlayerInfo: Boolean
}

export interface Player {
    isXChosen?: boolean,
    name?: String,
    isPlayer1?: boolean,
    isBot?: boolean,
    spotsChosen: Array<number>
}

export interface SettingsVal {
    _player1: PlayerState,
    _player2: PlayerState
}

export interface PlayerInfoProps {
    player: Player,
    setPlayer: Dispatch<SetStateAction<Partial<Player>>>,
}

export interface HandleBeforeUnloadListenerObj {
    preventDefault: Function,
    returnValue: String
}



export interface SelectedBtnStyles {
    backgroundColor: String
}

export interface TicTacToeSpaceProps {
    gridPosition: number,
    setWillRotate: Function,
    setGridSpotToSave: Function
}

// export interface NavbarProps {
//     isOnGame: Boolean,
// }

export interface CurrentTurn {
    isPlayerOne: Boolean,
    isPlayerTwo?: Boolean,
    isBot?: Boolean
}

export interface SideModalProps {
    setIsModalOn: Function
}

export interface ResetButtonProps {
    resetBtnTxt?: String | undefined
}

export interface TicTacToePageProps {
    willGoToHome?: Boolean
}

export interface VersusTypeObj {
    isBot: Boolean,
    isTwoPlayer: Boolean
}

export interface GameObj {
    currentLocation?: number,
    versusType?: VersusTypeObj
    player1: Player,
    player2?: Player
    currentTurn?: CurrentTurn,
    isStaleMate?: Boolean
}


export interface GridSpotToSave {
    spot: number,
    isPlayerOne: Boolean
}


