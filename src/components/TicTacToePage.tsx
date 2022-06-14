import React from 'react'
import VersusType from './gameSettings/VersusType';
import Navbar from './Navbar'
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal, PlayerState, VersusTypeSelection } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';
import { useEffect } from 'react';
import { Player, VersusTypeSelectionObj } from '../interfaces/interfaces';
import PlayerInfo from './gameSettings/PlayerInfo';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

// have the direction button only appear on the UI when the user is not in the process of a playing a game

// CASE: the user is on the


const TicTacToePage = () => {
  const [isDirectionsBtnOn, setIsDirectionsBtnOn] = useState(true);
  const [isForwardBtnDisabled, setIsForwardBtnDisabled] = useState(true);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(true);
  const playerDefaultVal: Player = {
    isSquareChosen: false,
    name: ''
  }
  const [player1, setPlayer1] = useState(playerDefaultVal);
  const [player2, setPlayer2] = useState(playerDefaultVal);
  const _player1:PlayerState = [player1, setPlayer1];
  const _player2:PlayerState = [player2, setPlayer2]
  const _isBackBtnDisabled: HookBooleanVal = [isBackBtnDisabled, setIsBackBtnDisabled];
  const _isForwardBtnDisabled: HookBooleanVal = [isForwardBtnDisabled, setIsForwardBtnDisabled];
  const versusTypeDefaultVal:VersusTypeSelectionObj = {
    isTwoPlayer: false,
    isBot: false
  }
  const firstRender = useRef({ didOccur: false });
  const [versusType, setVersusType] = useState(versusTypeDefaultVal);
  const { isTwoPlayer, isBot }: VersusTypeSelectionObj = versusType;
  const _versusType: VersusTypeSelection = [versusType, setVersusType];
  const path = window.location.pathname;
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === '/playerInfo';
  
  

  // if the user is on the first section, versus selection, and has made a versus selection, then enable the continue button
  useEffect(() => {
    if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
      setIsForwardBtnDisabled(false);
      setIsBackBtnDisabled(true);
    } 
    if (isOnVersusSelection && firstRender.current.didOccur) {
      setIsBackBtnDisabled(true);
    }

    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true;
    }
  }, [versusType, window.location.pathname])
  
  useLayoutEffect(() => {
    const versusType = localStorage.getItem('versusType');
    if (versusType) {
      const _versusType:VersusTypeSelectionObj = JSON.parse(versusType);
      setVersusType(_versusType);
    }
    if (isOnPlayerInfo) {
      setIsBackBtnDisabled(false);
    }
  }, []);


  return (
      <div className='ticTacToeMainPage'>
      <Navbar />
      <section className='interactionSection'>
        {isOnVersusSelection &&<VersusType _versusTypeSelection={_versusType}/>}
        {isOnPlayerInfo && <PlayerInfo _player1={_player1} _player2={_player2}/>}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled}/>}
      </section>
    </div>
  )
}

export default TicTacToePage