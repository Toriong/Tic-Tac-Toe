import React from 'react'
import { FC } from 'react'
import { CurrentTurn, DirectionBtnsProps, GameObj } from '../../interfaces/interfaces'
import history from '../../history/history'
import { HookBooleanVal } from '../../types/types'
import { useContext } from 'react'
import { GameContext, SettingsContext } from '../../provider/Providers'
import useNavigate from '../../customHooks/useNavigate'
import '../../css/directionBtnsContainer.css'
import { GiSteeltoeBoots } from 'react-icons/gi'


const DirectionBtns: FC<DirectionBtnsProps> = ({ _isBackBtnDisabled, _isForwardBtnDisabled }) => {
  const { currentTurn, setCurrentTurn } = useContext(GameContext);
  const { didErrorOccur, versusType, setBot, player1 } = useContext(SettingsContext);
  const { currentLocation, navigateToSec } = useNavigate();
  const [isBackBtnDisabled,]: HookBooleanVal = _isBackBtnDisabled;
  const [isForwardBtnDisabled]: HookBooleanVal = _isForwardBtnDisabled;
  const isOnVersusSelection = currentLocation === 1;
  const isOnPlayerInfo = currentLocation === 2;




  const handleContinueBtnClick = (): void => {
    let _game: (null | string | GameObj | Object) = localStorage.getItem('game')
    if (isOnVersusSelection && (typeof _game === 'string')) {
      // take the user to the player info card section, the section num is 2
      _game = _game ? { ...JSON.parse(_game), currentLocation: 2 } : { currentLocation: 2 };
      localStorage.setItem('game', JSON.stringify(_game));
      navigateToSec(2)
    } else {
      // when the user starts a game
      let _currentTurn: CurrentTurn = { ...currentTurn, isPlayerOne: true };
      let _bot;
      if (versusType.isBot) {
        delete _currentTurn.isPlayerTwo;
        _bot = { isBot: true, spotsChosen: [], isXChosen: !player1.isXChosen }
        setBot(_bot);
      };
      setCurrentTurn(_currentTurn);
      _game = _game ? { ...JSON.parse(_game as string), currentTurn: _currentTurn, currentLocation: 3 } : { currentTurn: _currentTurn, currentLocation: 3 };
      if (_bot && (_game as GameObj)) {
        _game = { ...(_game as GameObj), bot: _bot }
      } else if (_bot) {
        _game = { ...(_game as Object), bot: _bot };
      }
      localStorage.setItem('game', JSON.stringify(_game));
      navigateToSec(3)
    }
  }

  const handleBackBtnClick = (): void => { isOnPlayerInfo && navigateToSec(1); };


  return (
    <section className='directionBtnSec'>
      <button
        disabled={isBackBtnDisabled as boolean}
        onClick={handleBackBtnClick}
        className={isBackBtnDisabled ? 'disabledBtn' : ''}>
        Back
      </button>
      <button
        disabled={(isForwardBtnDisabled || didErrorOccur) as boolean}
        className={(isForwardBtnDisabled || didErrorOccur) ? 'disabledBtn' : ''}
        style={{ pointerEvents: (isForwardBtnDisabled || didErrorOccur) ? 'none' : 'auto' }}
        onClick={handleContinueBtnClick}
      >
        {isOnPlayerInfo ? 'Start game' : "Continue"}
      </button>
    </section>
  )
}

export default DirectionBtns