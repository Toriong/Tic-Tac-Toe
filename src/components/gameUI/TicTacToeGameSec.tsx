import React from 'react'
import '../../css/game/ticTacToeGameSec.css'
import TicTacToeSpace from './TicTacToeSpace';


const TicTacToeGrid = () => {
  const ticTacToeNumRows = ['', '', ''];
  return (
      <section className='ticTacToeGridSection'>
          <div className='ticTacToeMainGameContainer'>
        <table id='ticTacToeGrid'>
                    <tr className='ticTacToeRow'>
                      {ticTacToeNumRows.map((_,index) => <TicTacToeSpace gridPosition={index}/>)}
                    </tr>
                    <tr className='ticTacToeRow'>
                      {ticTacToeNumRows.map((_,index) => <TicTacToeSpace gridPosition={index + 4}/>)}
                    </tr>
                    <tr className='ticTacToeRow'>
                      {ticTacToeNumRows.map((_,index) => <TicTacToeSpace gridPosition={index + 7}/>)}
                    </tr>
              </table>
          </div>
    </section>
  )
}

export default TicTacToeGrid