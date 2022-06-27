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
import { GameObj, GridSpotToSave, Player } from '../../interfaces/interfaces';
import { HookBooleanVal } from '../../types/types';
import { saveGame } from '../../fns/saveGame';

const SPOTS_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const TicTacToeGrid: FC = () => {
  const { player1, player2, bot, versusType, setBot, } = useContext(SettingsContext);
  const { setIsResultModalOn, setIsGameOnNotifyModalOn } = useContext(ModalContext);
  const { currentTurn, setCurrentTurn, setIsGameDone, setRedLineClassName, setRedLine2ClassName, isGameDone, isStaleMate, setIsStaleMate, setIsOnGameSec, redLineClassName, redLine2ClassName } = useContext(GameContext);
  const [willRotate, setWillRotate]: HookBooleanVal = useState(false);
  const [gridSpotToSave, setGridSpotToSave] = useState<null | GridSpotToSave>(null);
  const { isTwoPlayer } = versusType;
  const ticTacToeNumRows = new Array(3).fill('');


  const checkingForAWinner = (willReverseArray?: boolean) => (willReverseArray ? winningNumsLists.reverse() : winningNumsLists).find(list => {
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

  const updateTurn = (playerFieldName: string) => {
    const _currentTurn = currentTurn.isPlayerOne ? { ...currentTurn, [playerFieldName]: true, isPlayerOne: false } : { ...currentTurn, isPlayerOne: true, [playerFieldName]: false }
    saveGame('currentTurn', _currentTurn)
    setCurrentTurn(_currentTurn);
  };

  const updateBotSpotsChosen = (num: number): void => {
    const _bot = bot ? { ...bot, spotsChosen: bot?.spotsChosen ? [...bot?.spotsChosen, num] : [num] } : { spotsChosen: [num] };
    saveGame('bot', _bot)
    setBot(_bot);
    setWillRotate(true);
  };



  useEffect(() => {
    if (willRotate) {
      const redLineClassName = (player1?.spotsChosen?.length as number >= 3) && checkingForAWinner();
      const isStaleMateVersusBot = (player1?.spotsChosen?.length && bot?.spotsChosen?.length) && ((player1.spotsChosen.length + bot.spotsChosen.length) === 9) && !redLineClassName;
      const isStaleMateTwoPlayers = (player1?.spotsChosen?.length && player2?.spotsChosen?.length) && ((player1.spotsChosen.length + player2.spotsChosen.length) === 9) && !redLineClassName;
      if (isStaleMateTwoPlayers || isStaleMateVersusBot) {
        saveGame('isStaleMate', true);
        saveGame('isGameDone', true);
        setIsStaleMate(true);
        setIsGameDone(true);
        setIsResultModalOn(true);
      } else if (redLineClassName) {
        const redLine2ClassName = checkingForAWinner(true);
        if (redLine2ClassName !== redLineClassName) {
          setRedLine2ClassName(redLine2ClassName);
          saveGame('redLine2ClassName', JSON.stringify(redLine2ClassName))
        };
        setIsResultModalOn(true);
        setRedLineClassName(redLineClassName);
        saveGame('isDone', true);
        saveGame('redLineClassName', JSON.stringify(redLineClassName));
        setIsGameDone(true);
      } else if (isTwoPlayer) {
        updateTurn('isPlayerTwo');
      } else {
        updateTurn('isBot');
      }
      setWillRotate(false);
    }
  }, [willRotate]);


  const placeBotShape = () => {
    let takenSpots: Array<number> = [];
    if (player1?.spotsChosen?.length) {
      takenSpots = takenSpots.concat(player1.spotsChosen);
    };
    if (bot?.spotsChosen?.length) {
      takenSpots = takenSpots.concat(bot.spotsChosen)
    };
    const freeSpots = takenSpots?.length && SPOTS_NUMS.filter(spotNum => !takenSpots?.includes(spotNum));
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
        return;
      }

      if (((isBotOn1 && isBotOn3) || (isBotOn5 && isBotOn8)) && !isUserOn2 && !isBotOn2) {
        updateBotSpotsChosen(2);
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
        return;
      }

      if (((isBotOn3 && isBotOn9) || (isBotOn4 && isBotOn5)) && !isBotOn6 && !isUserOn6) {
        updateBotSpotsChosen(6);
        return;
      }

      if (((isBotOn1 && isBotOn4) || (isBotOn3 && isBotOn5) || (isBotOn8 && isBotOn9)) && !isBotOn7 && !isUserOn7) {
        updateBotSpotsChosen(7);
        return;
      }

      if (((isBotOn2 && isBotOn5) || (isBotOn7 && isBotOn9)) && !isBotOn8 && !isUserOn8) {
        updateBotSpotsChosen(8);
        return;
      }

      if (((isBotOn7 && isBotOn8) || (isBotOn3 && isBotOn6) || (isBotOn5 && isBotOn1)) && !isBotOn9 && !isUserOn9) {
        updateBotSpotsChosen(9);
        return;
      }


      // DEFENSE MANEUVERS
      if (((isUserOn1 && isUserOn2) || (isUserOn9 && isUserOn6) || (isUserOn5 && isUserOn7)) && !isBotOn3 && !isUserOn3) {
        updateBotSpotsChosen(3);
        return;
      };



      if (((isUserOn4 && isUserOn1) || (isUserOn5 && isUserOn3) || (isUserOn8 && isUserOn9)) && !isBotOn7 && !isUserOn7) {
        updateBotSpotsChosen(7);

        return;
      }


      if (((isUserOn2 && isUserOn5) || (isUserOn7 && isUserOn9)) && !isBotOn8 && !isUserOn8) {
        updateBotSpotsChosen(8);

        return;
      }

      if (((isUserOn7 && isUserOn8) || (isUserOn3 && isUserOn6) || (isUserOn5 && isUserOn1)) && !isBotOn9 && !isUserOn9) {
        updateBotSpotsChosen(9);
        return;
      }

      if (((isUserOn2 && isUserOn3) || (isUserOn5 && isUserOn9) || (isUserOn7 && isUserOn4)) && !isBotOn1 && !isUserOn1) {
        updateBotSpotsChosen(1);

        return;
      }

      if (((isUserOn3 && isUserOn9) || (isUserOn4 && isUserOn5)) && !isBotOn6 && !isUserOn6) {
        updateBotSpotsChosen(6);
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
      const randomSpot = Math.floor(Math.random() * freeSpots.length);
      const spotChosen = freeSpots[randomSpot];
      updateBotSpotsChosen(spotChosen);
    };
  }

  useEffect(() => {
    if (currentTurn.isBot && !isGameDone) {
      setTimeout(() => { placeBotShape(); }, 1000);
    }

    if (gridSpotToSave) {
      let game: GameObj = JSON.parse(localStorage.getItem('game') as string);
      const { isPlayerOne, spot } = gridSpotToSave;
      const playerFieldName = isPlayerOne ? 'player1' : 'player2';
      const player: Player = { ...game[playerFieldName], spotsChosen: [...(game?.[playerFieldName]?.spotsChosen as Array<number>), spot] }
      game = { ...game, [playerFieldName]: player };
      localStorage.setItem('game', JSON.stringify(game));
      setGridSpotToSave(null);
    }
  }, [currentTurn.isBot, gridSpotToSave])

  useLayoutEffect(() => {
    const game: GameObj = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game') as string) : {};
    if (game.isDone || game.isStaleMate) {
      const { isStaleMate, redLine2ClassName } = game;
      setIsGameDone(true);
      isStaleMate && setIsStaleMate(true);
      setIsResultModalOn(true);
      redLine2ClassName && setRedLine2ClassName(redLine2ClassName)
    };
    setIsOnGameSec(true);

    return () => { setIsOnGameSec(false); };
  }, []);







  return (
    <section className='ticTacToeGridSection'>
      <div className='ticTacToeMainGameContainer'>
        {(isGameDone && !isStaleMate) && <RedLine redLineClassName={redLineClassName} isRedLine1 />}
        {(isGameDone && !isStaleMate && redLine2ClassName) && <RedLine redLine2ClassName={redLine2ClassName} />}
        <table id='ticTacToeGrid'>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 1} setWillRotate={setWillRotate} setGridSpotToSave={setGridSpotToSave} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 4} setWillRotate={setWillRotate} setGridSpotToSave={setGridSpotToSave} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 7} setWillRotate={setWillRotate} setGridSpotToSave={setGridSpotToSave} />)}
          </tr>
        </table>
      </div>
    </section>
  )
}

export default TicTacToeGrid