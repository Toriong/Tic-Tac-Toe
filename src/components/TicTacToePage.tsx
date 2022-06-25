import React from 'react'
import VersusType from './gameSettings/VersusType';
import '../css/ticTacToePage.css'
import { useState } from 'react';
import { HookBooleanVal } from '../types/types';
import DirectionBtns from './buttonContainers/DirectionBtns';
import { useEffect } from 'react';
import { GameObj, TicTacToePageProps, VersusTypeSelectionObj } from '../interfaces/interfaces';
import PlayerInfoSec from './gameSettings/PlayerInfoSec';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { GameContext, LocationContext, ModalContext, SettingsContext } from '../provider/Providers';
import history from '../history/history';
import TicTacToeGameSec from './gameUI/TicTacToeGameSec';
import Result from './modal/Result';
import GameIsOn from './modal/GameIsOn';
import { FC } from 'react';
import useNavigate from '../customHooks/useNavigate';


// GOAL: when the user is on the versus section page, have the following occur:

// when the user presses on the versus type, save changes into the local storage
// disable the forward button when there is no selection made


const TicTacToePage: FC<TicTacToePageProps> = ({ didErrorOccur }) => {
  const { player1, player2, versusType, setVersusType, bot, wasShapeBtnClicked } = useContext(SettingsContext);
  const { isResultModalOn, isGameOnNotifyModalOn } = useContext(ModalContext);
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
  const { currentLocation, navigateToSec } = useNavigate()
  const isOnVersusSelection = currentLocation === 1;
  const isOnPlayerInfo = currentLocation === 2;
  const isOnGameSection = currentLocation === 3;



  useEffect(() => {
    if (!firstRender.current.didOccur) {
      firstRender.current.didOccur = true
    } else {
      if ((isBot || isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
        setIsForwardBtnDisabled(false);
        setIsBackBtnDisabled(true);
      } else if ((!isBot && !isTwoPlayer) && isOnVersusSelection && firstRender.current.didOccur) {
        setIsForwardBtnDisabled(true);
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
          (isANameEmpty || isNoShapeChosen) ? setIsForwardBtnDisabled(true) : setIsForwardBtnDisabled(false);
        } else {
          const isANameEmpty = player1?.name === "";
          (isANameEmpty || !wasShapeBtnClicked) ? setIsForwardBtnDisabled(true) : setIsForwardBtnDisabled(false);
        }
      }
      isOnGameSection && setIsDirectionsBtnOn(false);
    }
  }, [isOnGameSection, isOnVersusSelection, versusType, player2Name, player1Name, isXPlayer1, isXPlayer2, isOnPlayerInfo, bot?.isXChosen])

  useLayoutEffect(() => {
    const game: GameObj = JSON.parse(localStorage.getItem('game') as string);
    if (game?.versusType) {
      setVersusType(game.versusType as Object);
      setIsDirectionsBtnOn(true);
    }

    if (isOnPlayerInfo) {
      setIsBackBtnDisabled(false);
      setIsForwardBtnDisabled(true);
      setIsDirectionsBtnOn(true);
    }

    isOnGameSection && setIsDirectionsBtnOn(false);
  }, []);




  useEffect(() => {
    if (willShowAlert) {
      alert("An error has occurred.")
      setWillShowAlert(false);
    }
  }, [willShowAlert]);

  useEffect(() => {
    if (didErrorOccur) {
      setWillShowAlert(true);
      const { currentLocation }: GameObj = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game') as string) : {}
      currentLocation && navigateToSec(currentLocation);
      history.push('/');
    }
  }, []);

  useEffect(() => {
    console.log('bot: ', bot)
  })


  return (
    <div className='ticTacToeMainPage'>
      <section className='interactionSection'>
        {isOnVersusSelection && <VersusType />}
        {isOnPlayerInfo && <PlayerInfoSec />}
        {isDirectionsBtnOn && <DirectionBtns _isBackBtnDisabled={_isBackBtnDisabled} _isForwardBtnDisabled={_isForwardBtnDisabled} _compRenderToggle={_compRenderToggle} />}
        {isOnGameSection && <TicTacToeGameSec />}
      </section>
      {isResultModalOn && <Result />}
      {isGameOnNotifyModalOn && <GameIsOn />}
    </div>
  )
}

export default TicTacToePage