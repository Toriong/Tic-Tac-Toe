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
  const [isDirectionsBtnOn, setIsDirectionsBtnOn]:HookBooleanVal = useState(true);
  const [isForwardBtnDisabled, setIsForwardBtnDisabled]:HookBooleanVal = useState(true);
  const [isBackBtnDisabled, setIsBackBtnDisabled]:HookBooleanVal = useState(true);
  const [compRenderToggle, setCompRenderToggle]:HookBooleanVal = useState(false);
  // why does telling the function that it will return an object throws an error
  const getPlayerDefaultVal = (isPlayerOne: Boolean = false) => {
    const playerDefaultVal:Player = isPlayerOne ? { isSquareChosen: false, name: 'Player 1' } : { isSquareChosen: false, name: 'Player 2' };
    return playerDefaultVal;
  }
  const [player1, setPlayer1]:PlayerState = useState(getPlayerDefaultVal(true));
  const [player2, setPlayer2]:PlayerState = useState(getPlayerDefaultVal());
  const _player1:PlayerState = [player1, setPlayer1];
  const _player2:PlayerState = [player2, setPlayer2]
  const _compRenderToggle:HookBooleanVal = [compRenderToggle, setCompRenderToggle]
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


  // if two player
      // if neither a shape was chosen nor a name was inputted for both players, then disable the forward button
      // if both players inputted their name and has chosen a shape, then enable the start game button

  // CASE: neither players has inputted anything for their name nor the shape that they have chosen
  //GOAL: disable the forward button
  // the forward button is disabled
  // if no input, then disable the forward button
  // player one has not inputted a name
  // player two has not inputted a name
  // check if player one and player two has inputted a name
  // the user is on the playerInfo section

  // CASE: neither of players has chosen a shape
  // GOAL: disable forward button
  // the forward button is disabled
  // the following fields for both players is false: isSquareChosen
  // check if for both players have the field isSquareChosen as false
  // the users are on the playerInfo section

      // if one player,
      // if the first player hasn't chosen a name and hasn't chosen a shape, then disable the forward button
      // if the player has inputted a name and has chosen a shape, then enable the start game button
      // if the player has inputted a name but hasn't chosen a shape, then disable the start game button

  // CASE: if both players has chosen a shape and there are no empty strings for their names, then enable the start button 
  // the start button is enable
  // B)both users have names (there are no empty strings in the field of name)
  //A) there are no false booleans in both in the following fields: 'isSquareChosen'
  // if A and B, then enable the start button
  // the user is on the player info section
  useLayoutEffect(() => {

    if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
      setIsForwardBtnDisabled(false);
      setIsBackBtnDisabled(true);
    } 
    if (isOnVersusSelection && firstRender.current.didOccur) {
      setIsBackBtnDisabled(true);
    }
    
    if (isOnPlayerInfo) {
      setIsBackBtnDisabled(false);
      if (isTwoPlayer) {
        const { isSquareChosen: isSquareChosenPlayer1, name: player1Name }:Player = player1;
        const { isSquareChosen: isSquareChosenPlayer2, name: player2Name }:Player = player2;
        const isNoShapeChosen = (isSquareChosenPlayer1 === false) && (isSquareChosenPlayer2 === false)
        const isANameEmpty = (player1Name === "") || (player2Name === "")
        if (isANameEmpty || isNoShapeChosen) {
          setIsForwardBtnDisabled(true);
        } else {
          setIsForwardBtnDisabled(false);
        }
      }
      // if the users hasn't chosen there name and their shape, then disable the forward button
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
        {isOnPlayerInfo && <PlayerInfo />}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled} _compRenderToggle={_compRenderToggle}/>}
      </section>
    </div>
  )
}

export default TicTacToePage