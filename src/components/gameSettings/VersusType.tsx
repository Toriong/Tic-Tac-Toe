import React from 'react'
import { FC } from 'react'
import { VersusTypeSelectionObj } from '../../interfaces/interfaces'
import { useContext } from 'react'
import { ModalContext, SettingsContext } from '../../provider/Providers'
import '../../css/gameSettings/versusType.css'
import { handleElementClick } from '../../fns/handleElementClick'




const VersusType: FC = () => {
  const { versusType, setVersusType } = useContext(SettingsContext);
  const { isBot, isTwoPlayer } = versusType

  const handleBtnClick = (isBot: Boolean, isTwoPlayer: boolean) => () => {
    const _versusType: VersusTypeSelectionObj = {
      isBot: isBot,
      isTwoPlayer: isTwoPlayer
    };
    let _game: (string | Object | null) = localStorage.getItem('game');
    if (typeof _game === 'string') {
      _game = JSON.parse(_game);
      _game = { ...(_game as Object), versusType: _versusType };
    };
    _game = !_game ? { versusType: _versusType } : _game;
    localStorage.setItem('game', JSON.stringify(_game));
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