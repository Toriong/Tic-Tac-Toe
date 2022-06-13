import { HookBooleanVal, VersusTypeSelection } from "../types/types";


export interface VersusTypeProps{
    _versusTypeSelection: VersusTypeSelection
}

export interface VersusTypeSelectionObj{
    isTwoPlayer: Boolean,
    isBot: Boolean
}


export interface DirectionBtnsProps{
    _isBackBtnDisabled: HookBooleanVal,
    _isForwardBtnDisabled: HookBooleanVal
}

