import React from 'react'
import VersusType from './gameSettings/VersusType';
import Navbar from './Navbar'
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal, VersusTypeSelection } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';

// have the direction button only appear on the UI when the user is not in the process of a playing a game

// CASE: the user is on the


const TicTacToePage = () => {
  const [isDirectionsBtnOn, setIsDirectionsBtnOn] = useState(true);
  const [isForwardBtnDisabled, setIsForwardBtnDisabled] = useState(true);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(true);
  const _isBackBtnDisabled: HookBooleanVal = [isBackBtnDisabled, setIsBackBtnDisabled];
  const _isForwardBtnDisabled: HookBooleanVal = [isForwardBtnDisabled, setIsForwardBtnDisabled];
  const versusTypeDefaultVal = {
    isTwoPlayer: false,
    isBot: false
  }
  const [versusType, setVersusType] = useState(versusTypeDefaultVal);
  const _versusType: VersusTypeSelection = [versusType, setVersusType];
  const path = window.location.pathname;
  const isOnVersusSelection = path === '/';
  
  
  


  return (
      <div className='ticTacToeMainPage'>
      <Navbar />
      <section className='interactionSection'>
        {isOnVersusSelection &&<VersusType _versusTypeSelection={_versusType}/>}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled}/>}
      </section>
    </div>
  )
}

export default TicTacToePage