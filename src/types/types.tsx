import React, { Dispatch, SetStateAction } from 'react'
import { CurrentTurn, Player, SelectedBtnStyles, VersusTypeSelectionObj } from "../interfaces/interfaces";


// THINGS TO DO MORE RESEARCH ON:
// dispatch
// setStateAction
// Function

export type HookBooleanVal = [boolean, Function];

export type GlobalValuesSettings = { player1: Player, player2: Player, setPlayer1: Dispatch<SetStateAction<Partial<Player>>>, setPlayer2: Dispatch<SetStateAction<Partial<Player>>> }

export type VersusTypeSelection = [VersusTypeSelectionObj, Function];

export type PlayerState = [Player, Dispatch<SetStateAction<Partial<Player>>>];

export type SelectedBtnStylesObj = SelectedBtnStyles | Object;

export type CurrentTurnState = [CurrentTurn, Dispatch<SetStateAction<Partial<CurrentTurn>>>];


