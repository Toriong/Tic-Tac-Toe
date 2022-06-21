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


// GOAL: implement stalemate logic 

// GOAL: when all spots are full end the game 


const TicTacToeGrid: FC = () => {
  const { player1, player2, bot, versusType, setBot } = useContext(SettingsContext);
  const { setIsResultModalOn } = useContext(ModalContext);
  const { currentTurn, setCurrentTurn, setIsGameDone, setWinningListName, isGameDone, isStaleMate, setIsStaleMate } = useContext(GameContext);
  const [willRotate, setWillRotate] = useState(false);
  const { isBot, isTwoPlayer } = versusType;
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
      // BRAIN DUMP NOTES:
      // for all players, (either player 1 and player 2 or player 1 and the bot), check if the sum of the array of spotChosen is equal to 9. If equal to nine and checkingForAWinner doesn't return anything, then that means the game ended in a tie. 
      const isStaleMateVersusBot = (player1?.spotsChosen?.length && bot?.spotsChosen?.length) && ((player1.spotsChosen.length + bot.spotsChosen.length) === 9) && !numListName;
      const isStaleMateTwoPlayers = (player1?.spotsChosen?.length && bot?.spotsChosen?.length) && ((player1.spotsChosen.length + bot.spotsChosen.length) === 9) && !numListName;
      if (isStaleMateTwoPlayers || isStaleMateVersusBot) {
        setIsStaleMate(true);
        setIsGameDone(true);
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

  useEffect(() => {
    if (currentTurn.isBot && !isGameDone) {
      setTimeout(() => {
        let takenSpots: Array<number> = [];
        if (player1?.spotsChosen?.length) {
          takenSpots = takenSpots.concat(player1.spotsChosen);
        };
        if (bot?.spotsChosen?.length) {
          takenSpots = takenSpots.concat(bot.spotsChosen)
        };
        console.log('takenSpots: ', takenSpots)
        debugger
        const freeSpots = takenSpots?.length && SPOTS_NUMS.filter(spotNum => !takenSpots?.includes(spotNum));
        if ((typeof freeSpots === 'object') && freeSpots.length) {
          const index = Math.floor(Math.random() * freeSpots.length);
          const spotChosen = freeSpots[index];
          const _bot = bot ? { ...bot, spotsChosen: bot?.spotsChosen ? [...bot?.spotsChosen, spotChosen] : [spotChosen] } : { spotsChosen: [spotChosen] };
          localStorage.setItem('Bot', JSON.stringify(_bot));
          setBot(_bot);
        };
        setWillRotate(true);
      }, 1000);
    }
  }, [currentTurn.isBot])

  useLayoutEffect(() => {
    if (localStorage.getItem('isGameDone')) {
      setIsGameDone(JSON.parse(localStorage.getItem('isGameDone') as string));
      setIsResultModalOn(true);
    }
  }, []);



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