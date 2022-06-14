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
    isSquareChosen: Boolean,
    name: String
}

export interface PlayerCompProp{
    _player1: PlayerState,
    _player2?:PlayerState
}

