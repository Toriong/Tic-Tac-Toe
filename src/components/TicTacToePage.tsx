import React from 'react'
import VersusType from './gameSettings/VersusType';
import Navbar from './Navbar'
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal, PlayerState, VersusTypeSelection } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';
import { useEffect } from 'react';
import { HandleBeforeUnloadListenerObj, Player, SettingsVal, VersusTypeSelectionObj } from '../interfaces/interfaces';
import PlayerInfoSec from './gameSettings/PlayerInfoSec';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { GameContext, ModalContext, ModalProvider, SettingsContext } from '../provider/Providers';
import history from '../history/history';
import { useNavigate, useLocation } from 'react-router-dom';
import TicTacToeGameSec from './gameUI/TicTacToeGameSec';
import Result from './modal/Result';
import { BsWindowDock } from 'react-icons/bs';
import { GiConsoleController } from 'react-icons/gi';

// have the direction button only appear on the UI when the user is not in the process of a playing a game

// CASE: the user is on the


const TicTacToePage = () => {
  // this allows the useEffect to respond to changes to the url 
  // useNavigate();
  const { player1, player2, versusType, setVersusType, bot } = useContext(SettingsContext);
  const { isResultModalOn, setIsResultModalOn, isSideModalOn, setIsSideModalOn } = useContext(ModalContext);
  const { isOnGameSec } = useContext(GameContext);;
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


  useLayoutEffect(() => history.listen(location => {
    console.log('location.location: ', location.location)
    const isOnVersusSelection = location.location.pathname === '/';
    const isOnPlayerInfo = location.location.pathname === '/playerInfo'
    setIsResultModalOn(false);
    debugger
    if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
      setIsForwardBtnDisabled(false);
      setIsBackBtnDisabled(true);
    }
    if (isOnVersusSelection) {
      setIsDirectionsBtnOn(true);
      setIsBackBtnDisabled(true);
    };

    // if the user is on the game section, then display the directions button
    isGameOn && setIsDirectionsBtnOn(false);

    if (isOnPlayerInfo) {
      setIsDirectionsBtnOn(true);
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
  }), [history])



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
          const isANameEmpty = player1?.name === "";
          const isNoShapeChosen = (player1?.isXChosen === false) && (bot?.isXChosen === undefined) && (bot?.isXChosen !== true);
          debugger
          if (isANameEmpty || isNoShapeChosen) {
            setIsForwardBtnDisabled(true);
          } else {
            setIsForwardBtnDisabled(false);
          }
        }
      }
      isGameOn && setIsDirectionsBtnOn(false);
    }
  }, [isGameOn, versusType, player2Name, player1Name, isXPlayer1, isXPlayer2, isOnPlayerInfo, bot?.isXChosen])

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


  const handleBeforeUnloadListener = (event: HandleBeforeUnloadListenerObj) => {
    event.preventDefault();
    if (isOnGameSec) {
      return event.returnValue = "Are you sure you want to exit?";
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnloadListener, { capture: true })
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnloadListener, { capture: true });
    }
  }, [])


  return (
    <div className='ticTacToeMainPage'>
      <section className='interactionSection'>
        {isOnVersusSelection && <VersusType />}
        {isOnPlayerInfo && <PlayerInfoSec />}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled} _compRenderToggle={_compRenderToggle} />}
        {isGameOn && <TicTacToeGameSec />}
      </section>
      {isResultModalOn && <Result />}
    </div>
  )
}

export default TicTacToePage