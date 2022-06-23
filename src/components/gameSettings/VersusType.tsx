import React from 'react'
import { FC } from 'react'
import { VersusTypeSelectionObj } from '../../interfaces/interfaces'
import { useContext } from 'react'
import { SettingsContext } from '../../provider/Providers'
import '../../css/gameSettings/versusType.css'




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
      <button style={{ background: isTwoPlayer ? 'grey' : 'none', pointerEvents: isTwoPlayer ? 'none' : 'auto' }} onClick={handleBtnClick(false, true)}>Two players</button>
      <button style={{ background: isBot ? 'grey' : 'none', pointerEvents: isBot ? 'none' : 'auto' }} onClick={handleBtnClick(true, false)}>Play against a bot</button>
    </div>
  )
}

export default VersusType