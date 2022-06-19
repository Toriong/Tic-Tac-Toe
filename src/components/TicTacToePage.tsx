import React from 'react'
import VersusType from './gameSettings/VersusType';
import Navbar from './Navbar'
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal, PlayerState, VersusTypeSelection } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';
import { useEffect } from 'react';
import { Player, SettingsVal, VersusTypeSelectionObj } from '../interfaces/interfaces';
import PlayerInfoSec from './gameSettings/PlayerInfoSec';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { ModalContext, ModalProvider, SettingsContext } from '../provider/Providers';
import history from '../history/history';
import { useNavigate, useLocation } from 'react-router-dom';
import TicTacToeGameSec from './gameUI/TicTacToeGameSec';
import Result from './modal/Result';

// have the direction button only appear on the UI when the user is not in the process of a playing a game

// CASE: the user is on the


const TicTacToePage = () => {
  // this allows the useEffect to respond to changes to the url 
  // useNavigate();
  const { player1, player2, versusType, setVersusType } = useContext(SettingsContext);
  const { isResultModalOn, setIsResultModalOn } = useContext(ModalContext);
  const { name: player1Name, isXChosen: isXPlayer1 } = player1;
  const { name: player2Name, isXChosen: isXPlayer2 } = player2;
  const [isDirectionsBtnOn, setIsDirectionsBtnOn]: HookBooleanVal = useState(true);
  const [isForwardBtnDisabled, setIsForwardBtnDisabled]: HookBooleanVal = useState(true);
  const [isBackBtnDisabled, setIsBackBtnDisabled]: HookBooleanVal = useState(true);
  const [compRenderToggle, setCompRenderToggle]: HookBooleanVal = useState(false);
  const firstRender = useRef({ didOccur: false });
  // why does telling the function that it will return an object throws an error
  const _compRenderToggle: HookBooleanVal = [compRenderToggle, setCompRenderToggle]
  const _isBackBtnDisabled: HookBooleanVal = [isBackBtnDisabled, setIsBackBtnDisabled];
  const _isForwardBtnDisabled: HookBooleanVal = [isForwardBtnDisabled, setIsForwardBtnDisabled];
  const { isTwoPlayer, isBot } = versusType;
  const path = history.location.pathname;
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === '/playerInfo';
  const isGameOn = path === '/game';
  // const _history = useNavigate();
  // const location = useLocation();

  const handleOnClick = () => { setIsResultModalOn(false); };


  // GOAL: update the page when the url changes by using the code below

  useEffect(() => history.listen(location => {
    const isOnVersusSelection = location.location.pathname === '/';
    const isOnPlayerInfo = location.location.pathname === '/playerInfo'
    if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
      setIsForwardBtnDisabled(false);
      setIsBackBtnDisabled(true);
    }
    if (isOnVersusSelection) {
      !isDirectionsBtnOn && setIsDirectionsBtnOn(true);
      setIsBackBtnDisabled(true);
    };

    // if the user is on the game section, then display the directions button
    isGameOn && setIsDirectionsBtnOn(false);

    if (isOnPlayerInfo) {
      !isDirectionsBtnOn && setIsDirectionsBtnOn(true);
      setIsBackBtnDisabled(false);
      if (isTwoPlayer) {
        const { isXChosen: isPlayer1X, name: player1Name } = player1;
        const { isXChosen: isPlayer2X, name: player2Name } = player2;
        const isNoShapeChosen = (isPlayer1X === false) && (isPlayer2X === false);
        const isANameEmpty = (player1Name === "") || (player2Name === "");
        if (isANameEmpty || isNoShapeChosen) {
          setIsForwardBtnDisabled(true);
        } else {
          setIsForwardBtnDisabled(false);
        }
      } else {
        const isANameEmpty = player1.name === "";
        if (isANameEmpty) {
          setIsForwardBtnDisabled(true);
        } else {
          setIsForwardBtnDisabled(false);
        }
      }
    }
  })
    , [history])



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
  // the following fields for both players is false: isXChosen
  // check if for both players have the field isXChosen as false
  // the users are on the playerInfo section

  // if one player,
  // if the first player hasn't chosen a name and hasn't chosen a shape, then disable the forward button
  // if the player has inputted a name and has chosen a shape, then enable the start game button
  // if the player has inputted a name but hasn't chosen a shape, then disable the start game button

  // CASE: if both players has chosen a shape and there are no empty strings for their names, then enable the start button
  // the start button is enable
  // B)both users have names (there are no empty strings in the field of name)
  //A) there are no false booleans in both in the following fields: 'isXChosen'
  // if A and B, then enable the start button
  // the user is on the player info section


  // FIX BUG:
  // WHAT IS HAPPENING: when it is just one user, the start game is enable even though the user hasn't chosen a shape yet
  // WHAT I WANT: when it is just a single user and the user hasn't chosen a shape yet, disable the forward button
  // HOW I SOLVED THIS BUG: added an else conditional and the logic for it for the case when the user chooses to play by himself


  // FIX BUG:
  // WHAT IS HAPPENING: when the user is on the playerInfo page, use the back arrow on the web browser to go back to the previous page, the player info section is still being displayed 
  // WHAT I WANT: if the player info is a single player and the user goes back to the versus type section by using back button on the browser, display the versus type section on the dom 




  useEffect(() => {
    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true
    } else {
      if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
        setIsForwardBtnDisabled(false);
        setIsBackBtnDisabled(true);
      }
      if (isOnVersusSelection && firstRender.current.didOccur) {
        !isDirectionsBtnOn && setIsDirectionsBtnOn(true);
        setIsBackBtnDisabled(true);
      }

      if (isOnPlayerInfo) {
        setIsBackBtnDisabled(false);
        if (isTwoPlayer) {
          !isDirectionsBtnOn && setIsDirectionsBtnOn(true);
          const { isXChosen: isPlayer1X, name: player1Name } = player1;
          const { isXChosen: isPlayer2X, name: player2Name } = player2;
          const isNoShapeChosen = (isPlayer1X === false) && (isPlayer2X === false);
          const isANameEmpty = (player1Name === "") || (player2Name === "");
          if (isANameEmpty || isNoShapeChosen) {
            setIsForwardBtnDisabled(true);
          } else {
            setIsForwardBtnDisabled(false);
          }
          debugger
        } else {
          const isANameEmpty = player1.name === "";
          if (isANameEmpty) {
            setIsForwardBtnDisabled(true);
          } else {
            setIsForwardBtnDisabled(false);
          }
        }
      }
      isGameOn && setIsDirectionsBtnOn(false);
    }
  }, [isGameOn, versusType, player2Name, player1Name, isXPlayer1, isXPlayer2, isOnPlayerInfo])

  useLayoutEffect(() => {
    const versusType = localStorage.getItem('versusType');

    if (versusType) {
      const _versusType: VersusTypeSelectionObj = JSON.parse(versusType);
      setVersusType(_versusType);
    }

    if (isOnPlayerInfo) {
      setIsBackBtnDisabled(false);
      setIsForwardBtnDisabled(true);
    }

  }, []);


  return (
    <div className='ticTacToeMainPage'>
      <Navbar isOnGame={isGameOn} />
      <section className='interactionSection'>
        {isOnVersusSelection && <VersusType />}
        {isOnPlayerInfo && <PlayerInfoSec />}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled} _compRenderToggle={_compRenderToggle} />}
        {isGameOn && <TicTacToeGameSec />}
      </section>
      {isResultModalOn &&
        <>
          <div className='blocker' onClick={handleOnClick} />
          <Result />
        </>
      }
    </div>
  )
}

export default TicTacToePage