import React, {  Dispatch, SetStateAction } from 'react'
import { Player, VersusTypeSelectionObj } from "../interfaces/interfaces";


// THINGS TO DO MORE RESEARCH ON:
// dispatch
// setStateAction
// Function

export type HookBooleanVal = [Boolean, Function];

export type GlobalValuesSettings = {player1: Player, player2: Player, setPlayer1: Dispatch<SetStateAction<Partial<Player>>>, setPlayer2: Dispatch<SetStateAction<Partial<Player>>>}

export type VersusTypeSelection = [VersusTypeSelectionObj, Function];

export type PlayerState = [Player, Dispatch<SetStateAction<Partial<Player>>>];


