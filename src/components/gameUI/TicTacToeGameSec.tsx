import React from 'react'
import { useEffect } from 'react';
import TicTacToeSpace from './TicTacToeSpace';
import { useState } from 'react';
import winningNumsLists from '../../data/winningNumsLists.json'
import { useContext } from 'react';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';
import { FC } from 'react';
import { useLayoutEffect } from 'react';
import RedLine from './RedLine';
import '../../css/game/ticTacToeGameSec.css'

const SPOTS_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const TicTacToeGrid: FC = () => {
  const { player1, player2, bot, versusType, setBot, } = useContext(SettingsContext);
  const { setIsResultModalOn, setIsGameOnNotifyModalOn } = useContext(ModalContext);
  const { currentTurn, setCurrentTurn, setIsGameDone, setWinningListName, isGameDone, isStaleMate, setIsStaleMate, setIsOnGameSec, setIsGameBeingPlayed } = useContext(GameContext);
  const [willRotate, setWillRotate] = useState(false);
  const { isTwoPlayer } = versusType;
  const ticTacToeNumRows = new Array(3).fill('');


  const checkingForAWinner = () => winningNumsLists.find(list => {
    let didPlayer1Win;
    if ((player1?.spotsChosen?.length as number) >= 3) {
      didPlayer1Win = list.nums?.every(num => player1?.spotsChosen?.includes(num));
      if (didPlayer1Win) {
        return true;
      }
    }

    if (isTwoPlayer && ((player2?.spotsChosen?.length as number) >= 3)) {
      return list.nums.every(num => player2?.spotsChosen?.includes(num));
    } else if (isTwoPlayer) {
      return false;
    }

    if ((bot?.spotsChosen?.length as number) >= 3) {
      return list.nums.every(num => bot?.spotsChosen?.includes(num))
    }

    return false;;
  })?.name

  useEffect(() => {
    if (willRotate) {
      const numListName = (player1?.spotsChosen?.length as number >= 3) && checkingForAWinner();
      const isStaleMateVersusBot = (player1?.spotsChosen?.length && bot?.spotsChosen?.length) && ((player1.spotsChosen.length + bot.spotsChosen.length) === 9) && !numListName;
      const isStaleMateTwoPlayers = (player1?.spotsChosen?.length && bot?.spotsChosen?.length) && ((player1.spotsChosen.length + bot.spotsChosen.length) === 9) && !numListName;
      if (isStaleMateTwoPlayers || isStaleMateVersusBot) {
        localStorage.setItem('isStaleMate', JSON.stringify(true))
        setIsStaleMate(true);
        setIsGameDone(true);
        setIsResultModalOn(true);
      } else if (numListName) {
        setIsResultModalOn(true);
        // to find the other winning list name, reverse the array to check if there is another winning nums 
        setWinningListName(numListName);
        localStorage.setItem('isGameDone', JSON.stringify(true));
        setIsGameDone(true);
      } else if (isTwoPlayer) {
        const _currentTurn = currentTurn.isPlayerOne ? { ...currentTurn, isPlayerTwo: true, isPlayerOne: false } : { ...currentTurn, isPlayerOne: true, isPlayerTwo: false }
        localStorage.setItem('currentTurn', JSON.stringify(_currentTurn));
        setCurrentTurn(_currentTurn);
      } else {
        const _currentTurn = currentTurn.isPlayerOne ? { ...currentTurn, isBot: true, isPlayerOne: false } : { ...currentTurn, isPlayerOne: true, isBot: false }
        localStorage.setItem('currentTurn', JSON.stringify(_currentTurn));
        setCurrentTurn(_currentTurn);
      }
      setWillRotate(false);
    }
  }, [willRotate]);

  const updateBotSpotsChosen = (num: number): void => {
    const _bot = bot ? { ...bot, spotsChosen: bot?.spotsChosen ? [...bot?.spotsChosen, num] : [num] } : { spotsChosen: [num] };
    localStorage.setItem('Bot', JSON.stringify(_bot));
    setBot(_bot);
    setWillRotate(true);
  }

  const placeBotShape = () => {
    let takenSpots: Array<number> = [];
    if (player1?.spotsChosen?.length) {
      takenSpots = takenSpots.concat(player1.spotsChosen);
    };
    if (bot?.spotsChosen?.length) {
      takenSpots = takenSpots.concat(bot.spotsChosen)
    };
    const freeSpots = takenSpots?.length && SPOTS_NUMS.filter(spotNum => !takenSpots?.includes(spotNum));
    debugger
    if ((typeof freeSpots === 'object') && freeSpots.length) {
      const isUserOn1 = player1.spotsChosen?.includes(1);
      const isUserOn2 = player1.spotsChosen?.includes(2);
      const isUserOn3 = player1.spotsChosen?.includes(3);
      const isUserOn4 = player1.spotsChosen?.includes(4);
      const isUserOn5 = player1.spotsChosen?.includes(5);
      const isUserOn6 = player1.spotsChosen?.includes(6);
      const isUserOn7 = player1.spotsChosen?.includes(7);
      const isUserOn8 = player1.spotsChosen?.includes(8);
      const isUserOn9 = player1.spotsChosen?.includes(9);
      const isBotOn1 = bot.spotsChosen?.includes(1);
      const isBotOn2 = bot.spotsChosen?.includes(2);
      const isBotOn3 = bot.spotsChosen?.includes(3);
      const isBotOn4 = bot.spotsChosen?.includes(4);
      const isBotOn5 = bot.spotsChosen?.includes(5);
      const isBotOn6 = bot.spotsChosen?.includes(6);
      const isBotOn7 = bot.spotsChosen?.includes(7);
      const isBotOn8 = bot.spotsChosen?.includes(8);
      const isBotOn9 = bot.spotsChosen?.includes(9);

      // MANEUVERS FOR THE WIN
      if (((isBotOn2 && isBotOn3) || (isBotOn5 && isBotOn9) || (isBotOn4 && isBotOn6)) && !isUserOn1 && !isBotOn1) {
        updateBotSpotsChosen(1);
        debugger
        return;
      }

      if (((isBotOn1 && isBotOn3) || (isBotOn5 && isBotOn8)) && !isUserOn2 && !isBotOn2) {
        updateBotSpotsChosen(2);
        debugger
        return;
      }

      if (((isBotOn1 && isBotOn2) || (isBotOn5 && isBotOn7) || (isBotOn6 && isBotOn9)) && !isBotOn3 && !isUserOn3) {
        updateBotSpotsChosen(3);
        return;
      }

      if (((isBotOn5 && isBotOn6) || (isBotOn1 && isBotOn7)) && !isBotOn4 && !isUserOn4) {
        updateBotSpotsChosen(4);
        return;
      }

      if (((isBotOn1 && isBotOn4) || (isBotOn5 && isBotOn3) || (isBotOn9 && isBotOn8)) && !isBotOn7 && !isUserOn7) {
        updateBotSpotsChosen(7);
        debugger
        return;
      }

      if (((isBotOn3 && isBotOn9) || (isBotOn4 && isBotOn5)) && !isBotOn6 && !isUserOn6) {
        updateBotSpotsChosen(6);
        debugger
        return;
      }

      if (((isBotOn1 && isBotOn4) || (isBotOn3 && isBotOn5) || (isBotOn8 && isBotOn9)) && !isBotOn7 && !isUserOn7) {
        updateBotSpotsChosen(7);
        return;
      }

      if (((isBotOn2 && isBotOn5) || (isBotOn7 && isBotOn9)) && !isBotOn8 && !isUserOn8) {
        updateBotSpotsChosen(8);
        debugger
        return;
      }

      if (((isBotOn7 && isBotOn8) || (isBotOn3 && isBotOn6) || (isBotOn5 && isBotOn1)) && !isBotOn9 && !isUserOn9) {
        updateBotSpotsChosen(9);
        debugger
        return;
      }


      // DEFENSE MANEUVERS
      if (((isUserOn1 && isUserOn2) || (isUserOn9 && isUserOn6) || (isUserOn5 && isUserOn7)) && !isBotOn3 && !isUserOn3) {
        updateBotSpotsChosen(3);
        return;
      };



      if (((isUserOn4 && isUserOn1) || (isUserOn5 && isUserOn3) || (isUserOn8 && isUserOn9)) && !isBotOn7 && !isUserOn7) {
        updateBotSpotsChosen(7);
        debugger
        return;
      }


      if (((isUserOn2 && isUserOn5) || (isUserOn7 && isUserOn9)) && !isBotOn8 && !isUserOn8) {
        updateBotSpotsChosen(8);
        debugger
        return;
      }

      if (((isUserOn7 && isUserOn8) || (isUserOn3 && isUserOn6) || (isUserOn5 && isUserOn1)) && !isBotOn9 && !isUserOn9) {
        updateBotSpotsChosen(9);
        debugger
        return;
      }

      if (((isUserOn2 && isUserOn3) || (isUserOn5 && isUserOn9) || (isUserOn7 && isUserOn4)) && !isBotOn1 && !isUserOn1) {
        updateBotSpotsChosen(1);
        debugger
        return;
      }

      if (((isUserOn3 && isUserOn9) || (isUserOn4 && isUserOn5)) && !isBotOn6 && !isUserOn6) {
        updateBotSpotsChosen(6);
        debugger
        return;
      }

      if ((((isUserOn5 && isUserOn6) || (isUserOn7 && isUserOn1) || (isBotOn5 && isBotOn6)) && !isBotOn4 && !isUserOn4)) {
        updateBotSpotsChosen(4);
        return;
      }

      if ((((isUserOn8 && isUserOn5) || (isUserOn1 && isUserOn3)) && !isBotOn2 && !isUserOn2)) {
        updateBotSpotsChosen(2);
        return;
      }





      if ((!isBotOn5 && !isUserOn5) || (isBotOn7 && isBotOn3)) {
        updateBotSpotsChosen(5);
        return;
      };



      // if there no options on defense nor any options for the win, then choose a spot at random
      const index = Math.floor(Math.random() * freeSpots.length);
      const spotChosen = freeSpots[index];
      const _bot = bot ? { ...bot, spotsChosen: bot?.spotsChosen ? [...bot?.spotsChosen, spotChosen] : [spotChosen] } : { spotsChosen: [spotChosen] };
      setBot(_bot);
      debugger
      localStorage.setItem('Bot', JSON.stringify(_bot));
    };
    debugger
    setWillRotate(true);
  }

  useEffect(() => {
    if (currentTurn.isBot && !isGameDone) {
      setTimeout(() => {
        placeBotShape();
      }, 1000);
    }
  }, [currentTurn.isBot])

  useLayoutEffect(() => {
    if ((localStorage.getItem('isGameDone') as string)) {
      setIsGameDone(JSON.parse(localStorage.getItem('isGameDone') as string));
      setIsResultModalOn(true);
    }
    setIsOnGameSec(true);
    setIsGameOnNotifyModalOn(false);
    setIsGameBeingPlayed(true);
    localStorage.getItem('isGameBeingPlayed') && localStorage.setItem('isGameBeingPlayed', JSON.stringify(true));

    return () => {
      setIsResultModalOn(false);
      setIsOnGameSec(false);
    }
  }, []);

  useEffect(() => {
    console.log('isGameDone: ', isGameDone)
  })



  return (
    <section className='ticTacToeGridSection'>
      <div className='ticTacToeMainGameContainer'>
        {(isGameDone && !isStaleMate) && <RedLine />}
        <table id='ticTacToeGrid'>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 1} setWillRotate={setWillRotate} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 4} setWillRotate={setWillRotate} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 7} setWillRotate={setWillRotate} />)}
          </tr>
        </table>
      </div>
    </section>
  )
}

export default TicTacToeGrid