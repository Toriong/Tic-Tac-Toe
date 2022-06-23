import React from 'react'
import VersusType from './gameSettings/VersusType';
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';
import { useEffect } from 'react';
import { HandleBeforeUnloadListenerObj, TicTacToePageProps, VersusTypeSelectionObj } from '../interfaces/interfaces';
import PlayerInfoSec from './gameSettings/PlayerInfoSec';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { GameContext, ModalContext, SettingsContext } from '../provider/Providers';
import history from '../history/history';
import TicTacToeGameSec from './gameUI/TicTacToeGameSec';
import Result from './modal/Result';
import GameIsOn from './modal/GameIsOn';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { FC } from 'react';

// have the direction button only appear on the UI when the user is not in the process of a playing a game

// CASE: the user is on the


const TicTacToePage: FC<TicTacToePageProps> = ({ willGoToHome }) => {
  const { player1, player2, versusType, setVersusType, bot } = useContext(SettingsContext);
  const { isResultModalOn, setIsResultModalOn, isGameOnNotifyModalOn, setIsGameOnNotifyModalOn } = useContext(ModalContext);
  const { isGameBeingPlayed: _isGameBeingPlayed } = useContext(GameContext);;
  const { name: player1Name, isXChosen: isXPlayer1 } = player1;
  const { name: player2Name, isXChosen: isXPlayer2 } = player2;
  const [isDirectionsBtnOn, setIsDirectionsBtnOn]: HookBooleanVal = useState(true);
  const [isForwardBtnDisabled, setIsForwardBtnDisabled]: HookBooleanVal = useState(true);
  const [isBackBtnDisabled, setIsBackBtnDisabled]: HookBooleanVal = useState(true);
  const [compRenderToggle, setCompRenderToggle]: HookBooleanVal = useState(false);
  const [willShowAlert, setWillShowAlert]: HookBooleanVal = useState(false);
  const _compRenderToggle: HookBooleanVal = [compRenderToggle, setCompRenderToggle]
  const _isBackBtnDisabled: HookBooleanVal = [isBackBtnDisabled, setIsBackBtnDisabled];
  const _isForwardBtnDisabled: HookBooleanVal = [isForwardBtnDisabled, setIsForwardBtnDisabled];
  const firstRender = useRef({ didOccur: false });
  const { isTwoPlayer, isBot } = versusType;
  const path = history.location.pathname;
  const isGameBeingPlayed = !!localStorage.getItem('isGameBeingPlayed')
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === '/playerInfo';
  const isOnGameSection = path === '/game';

  useLayoutEffect(() => history.listen(location => {
    const isOnVersusSelection = location.location.pathname === '/';
    const isOnPlayerInfo = location.location.pathname === '/playerInfo';
    const isOnGameSection = location.location.pathname === '/game';
    setIsResultModalOn(false);

    if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
      setIsForwardBtnDisabled(false);
      setIsBackBtnDisabled(true);
      (isGameBeingPlayed ?? _isGameBeingPlayed) ? setIsGameOnNotifyModalOn(true) : setIsGameOnNotifyModalOn(false);
      debugger
    }
    if (isOnVersusSelection) {
      setIsDirectionsBtnOn(true);
      setIsBackBtnDisabled(true);
      (isGameBeingPlayed ?? _isGameBeingPlayed) ? setIsGameOnNotifyModalOn(true) : setIsGameOnNotifyModalOn(false);
      debugger
    };

    if (isOnGameSection) {
      setIsDirectionsBtnOn(false);
      setIsGameOnNotifyModalOn(false);
      debugger
    }

    if (isOnPlayerInfo) {
      setIsDirectionsBtnOn(true);
      setIsBackBtnDisabled(false);
      if (isTwoPlayer) {
        const { isXChosen: isPlayer1X, name: player1Name } = player1;
        const { isXChosen: isPlayer2X, name: player2Name } = player2;
        const isNoShapeChosen = (isPlayer1X === false) && (isPlayer2X === false);
        const isANameEmpty = (player1Name === "") || (player2Name === "");
        (isANameEmpty || isNoShapeChosen) ? setIsForwardBtnDisabled(true) : setIsForwardBtnDisabled(false);
      } else {
        const isANameEmpty = player1.name === "";
        isANameEmpty ? setIsForwardBtnDisabled(true) : setIsForwardBtnDisabled(false);
      };
      (isGameBeingPlayed ?? _isGameBeingPlayed) ? setIsGameOnNotifyModalOn(true) : setIsGameOnNotifyModalOn(false);
      debugger
    };
  }), [history]);

  useEffect(() => {
    console.log('isGameOnNotifyModalOn: ', isGameOnNotifyModalOn)
  })




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
        } else {
          const isANameEmpty = player1?.name === "";
          const isNoShapeChosen = (player1?.isXChosen === false) && (bot?.isXChosen === undefined) && (bot?.isXChosen !== true);
          if (isANameEmpty || isNoShapeChosen) {
            setIsForwardBtnDisabled(true);
          } else {
            setIsForwardBtnDisabled(false);
          }
        }
      }
      isOnGameSection && setIsDirectionsBtnOn(false);
    }
  }, [isOnGameSection, versusType, player2Name, player1Name, isXPlayer1, isXPlayer2, isOnPlayerInfo, bot?.isXChosen])

  useLayoutEffect(() => {
    !isDirectionsBtnOn && setIsDirectionsBtnOn(true);
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




  useEffect(() => {
    if (willShowAlert && isOnVersusSelection) {
      alert("You must start a game to access the game section.")
      setWillShowAlert(false);
    }
  }, [willShowAlert]);

  useEffect(() => {
    if (isOnGameSection && !isGameBeingPlayed) {
      setWillShowAlert(true);
      history.replace('/');
    };

    willGoToHome && history.push('/');

    ((isGameBeingPlayed ?? _isGameBeingPlayed) && !isOnGameSection) ? setIsGameOnNotifyModalOn(true) : setIsGameOnNotifyModalOn(false);
  }, []);


  return (
    <div className='ticTacToeMainPage'>
      <section className='interactionSection'>
        {isOnVersusSelection && <VersusType />}
        {isOnPlayerInfo && <PlayerInfoSec />}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled} _compRenderToggle={_compRenderToggle} />}
        {(isOnGameSection && isGameBeingPlayed) && <TicTacToeGameSec />}
      </section>
      {isResultModalOn && <Result />}
      {(isGameOnNotifyModalOn) && <GameIsOn />}
    </div>
  )
}

export default TicTacToePage