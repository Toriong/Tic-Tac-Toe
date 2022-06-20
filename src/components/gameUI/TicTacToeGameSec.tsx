import React from 'react'
import { useEffect } from 'react';
import TicTacToeSpace from './TicTacToeSpace';
import { useState } from 'react';
import winningNumsLists from '../../data/winningNumsLists.json'
import { useContext } from 'react';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';
import { FC } from 'react';
import { useLayoutEffect } from 'react';
import '../../css/game/ticTacToeGameSec.css'
import { GiBottledShadow } from 'react-icons/gi';
import RedLine from './RedLine';


// GOAL: if the numbers in nums in winningNumsList are all in the array that is stored in spotsChosen of a player, then that user has won the game 




const TicTacToeGrid: FC = () => {
  const { player1, player2, bot, versusType } = useContext(SettingsContext);
  const { setIsResultModalOn } = useContext(ModalContext);
  const { currentTurn, setCurrentTurn, setIsGameDone, setWinningListName, isGameDone, isStaleMate } = useContext(GameContext);
  const [willCheckIfPlayerWon, setWillCheckIfPlayerWon] = useState(false);
  const ticTacToeNumRows = new Array(3).fill('');


  const checkingForAWinner = () => winningNumsLists.find(list => {
    let didPlayer1Win;
    if ((player1?.spotsChosen?.length as number) >= 3) {
      didPlayer1Win = list.nums?.every(num => player1?.spotsChosen?.includes(num));
      if (didPlayer1Win) {
        return true;
      }
    }

    if (versusType.isTwoPlayer && ((player2?.spotsChosen?.length as number) >= 3)) {
      return list.nums.every(num => player2?.spotsChosen?.includes(num));
    } else if (versusType.isTwoPlayer) {
      return false;
    }

    if ((bot?.spotsChosen?.length as number) >= 3) {
      return list.nums.every(num => bot?.spotsChosen?.includes(num))
    }

    return false;;
  })?.name

  useEffect(() => {
    if (willCheckIfPlayerWon) {
      const numListName = checkingForAWinner();
      if (numListName) {
        setIsResultModalOn(true);
        setWinningListName(numListName);
        localStorage.setItem('isGameDone', JSON.stringify(true));
        setIsGameDone(true);
      } else {
        const _currentTurn = currentTurn.isPlayerOne ? { ...currentTurn, isPlayerTwo: true, isPlayerOne: false } : { ...currentTurn, isPlayerOne: true, isPlayerTwo: false }
        localStorage.setItem('currentTurn', JSON.stringify(_currentTurn));
        setCurrentTurn(_currentTurn);
      };
      setWillCheckIfPlayerWon(false);
    }
  }, [willCheckIfPlayerWon]);


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
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 1} setWillCheckIfPlayerWon={setWillCheckIfPlayerWon} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 4} setWillCheckIfPlayerWon={setWillCheckIfPlayerWon} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 7} setWillCheckIfPlayerWon={setWillCheckIfPlayerWon} />)}
          </tr>
        </table>
      </div>
    </section>
  )
}

export default TicTacToeGrid