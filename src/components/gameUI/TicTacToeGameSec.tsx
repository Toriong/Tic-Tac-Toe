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
import RedLine from './RedLine';



const TicTacToeGrid: FC = () => {
  const { player1, player2, bot, versusType } = useContext(SettingsContext);
  const { setIsResultModalOn } = useContext(ModalContext);
  const { currentTurn, setCurrentTurn, setIsGameDone, setWinningListName, isGameDone, isStaleMate } = useContext(GameContext);
  const [willCheckIfPlayerWon, setWillCheckIfPlayerWon] = useState(false);
  const ticTacToeNumRows = new Array(3).fill('');


  const checkingForAWinner = () => winningNumsLists.find(list => {
    let didPlayer1Win;
    if ((player1?.spotsChosen?.length as number) >= 3) {
      didPlayer1Win = player1?.spotsChosen?.every(num => list.nums.includes(num));
      // if player1 is the winner, then return true, else check if the other player or bot has won.
      if (didPlayer1Win) {
        return true;
      }
    }

    if (versusType.isTwoPlayer && ((player2?.spotsChosen?.length as number) >= 3)) {
      return (player2?.spotsChosen as number[]).every(num => list.nums.includes(num));
    } else if (versusType.isTwoPlayer) {
      return false;
    }

    if ((bot?.spotsChosen?.length as number) >= 3) {
      return bot?.spotsChosen?.every(num => list.nums.includes(num))
    }

    return false;;
  })?.name

  useEffect(() => {
    if (willCheckIfPlayerWon) {
      const numListName = checkingForAWinner();
      if (numListName) {
        setIsResultModalOn(true);
        setWinningListName(numListName);
        // localStorage.setItem('isGameDone', JSON.stringify(true));
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
        {/* {(isGameDone && !isStaleMate) && <RedLine />} */}
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