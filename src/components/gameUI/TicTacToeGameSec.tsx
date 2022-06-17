import React from 'react'
import '../../css/game/ticTacToeGameSec.css'


const TicTacToeGrid = () => {
  return (
      <section className='ticTacToeGridSection'>
          <div className='ticTacToeMainGameContainer'>
        <table id='ticTacToeGrid'>
                    <tr className='ticTacToeRow'>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className='ticTacToeRow'>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className='ticTacToeRow'>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
              </table>
          </div>
    </section>
  )
}

export default TicTacToeGrid