import React from 'react'
import { FC } from 'react'
import { VersusTypeProps, VersusTypeSelectionObj } from '../../interfaces/interfaces'
import '../../css/gameSettings/versusType.css'




const VersusType:FC<VersusTypeProps> = ({_versusTypeSelection}) => {
    const [versusType, setVersusType] = _versusTypeSelection;
    const {isBot, isTwoPlayer} = versusType

    // why is it void when it is return anonymous function?
    const handleBtnClick = (isBot: Boolean, isTwoPlayer: boolean) => () => {
      const _versusType: VersusTypeSelectionObj = {
        isBot: isBot,
        isTwoPlayer: isTwoPlayer
      };
      localStorage.setItem('versusType', JSON.stringify(_versusType));
      setVersusType(_versusType);
    }
    
  return (
      <div className='versusSelectionContainer'>
          <button style={{background: isTwoPlayer && 'grey', pointerEvents: isTwoPlayer && 'none'}} onClick={handleBtnClick(false, true)}>Two players</button>
          <button style={{background: isBot && 'grey', pointerEvents: isBot && 'none'}} onClick={handleBtnClick(true, false)}>Play against a dumb bot</button>
    </div>
  )
}

export default VersusType