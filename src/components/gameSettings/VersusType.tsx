import React from 'react'
import { FC } from 'react'
import { VersusTypeProps } from '../../interfaces/interfaces'
import '../../css/gameSettings/versusType.css'


// GOAL: the user can choose to face either another player or a bot




const VersusType:FC<VersusTypeProps> = () => {


    const handleTwoPlayerBtnClick = ():void => {

    };

    const handleBotBtnClick = ():void => {
    }
    
  return (
      <div className='versusSelectionContainer'>
          <button onClick={handleTwoPlayerBtnClick}>Two players</button>
          <button onClick={handleBotBtnClick}>Play against a dumb bot</button>
    </div>
  )
}

export default VersusType