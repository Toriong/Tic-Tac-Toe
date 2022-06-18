import React from 'react'
import { FC } from 'react'
import { VersusTypeProps, VersusTypeSelectionObj } from '../../interfaces/interfaces'
import '../../css/gameSettings/versusType.css'
import { useContext } from 'react'
import { SettingsContext } from '../../provider/Providers'




const VersusType: FC = () => {
  const { versusType, setVersusType } = useContext(SettingsContext);
  const { isBot, isTwoPlayer } = versusType

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
      <button style={{ background: isTwoPlayer ? 'grey' : 'default', pointerEvents: isTwoPlayer ? 'none' : 'auto' }} onClick={handleBtnClick(false, true)}>Two players</button>
      <button style={{ background: isBot ? 'grey' : 'default', pointerEvents: isBot ? 'none' : 'auto' }} onClick={handleBtnClick(true, false)}>Play against a dumb bot</button>
    </div>
  )
}

export default VersusType