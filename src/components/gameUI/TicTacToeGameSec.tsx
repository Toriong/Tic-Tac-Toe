import React from 'react'
import { useEffect } from 'react';
import TicTacToeSpace from './TicTacToeSpace';
import '../../css/game/ticTacToeGameSec.css'


const TicTacToeGrid = () => {
  const ticTacToeNumRows = ['', '', ''];

  return (
    <section className='ticTacToeGridSection'>
      <div className='ticTacToeMainGameContainer'>
        <table id='ticTacToeGrid'>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 1} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 4} />)}
          </tr>
          <tr className='ticTacToeRow'>
            {ticTacToeNumRows.map((_, index) => <TicTacToeSpace gridPosition={index + 7} />)}
          </tr>
        </table>
      </div>
    </section>
  )
}

export default TicTacToeGrid