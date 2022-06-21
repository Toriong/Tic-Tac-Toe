import React from 'react'
import { FC } from 'react'
import { DirectionBtnsProps } from '../../interfaces/interfaces'
import history from '../../history/history'
import { HookBooleanVal } from '../../types/types'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import '../../css/directionBtnsContainer.css'


// BUG: 
// WHAT IS HAPPENING: when the user starts a new game, presses on the two players, goes to the game section, the confirm button is enabled
// WHAT I WANT: when the user is on the player info section, and the users hasn't chosen a shape, don't enable the forward button (the start game button)


const DirectionBtns: FC<DirectionBtnsProps> = ({ _isBackBtnDisabled, _isForwardBtnDisabled, _compRenderToggle }) => {
  const { currentTurn, setCurrentTurn } = useContext(GameContext)
  const path = window.location.pathname;
  const [isBackBtnDisabled,]: HookBooleanVal = _isBackBtnDisabled;
  const [isForwardBtnDisabled]: HookBooleanVal = _isForwardBtnDisabled;
  const [compRenderToggle, setCompRenderToggle]: HookBooleanVal = _compRenderToggle;
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === '/playerInfo';




  const handleContinueBtnClick = (): void => {
    if (isOnVersusSelection) {
      history.push('/playerInfo');
    } else {
      // when the user starts a game
      const _currentTurn = { ...currentTurn, isPlayerOne: true }
      setCurrentTurn(_currentTurn);
      localStorage.setItem('currentTurn', JSON.stringify(_currentTurn));
      history.push('/game');
    }
    setCompRenderToggle(!compRenderToggle)
  }



  const handleBackBtnClick = (): void => {
    if (isOnPlayerInfo) {
      history.push('/');
    };
    setCompRenderToggle(!compRenderToggle)
  }

  return (
    <section className='directionBtnSec'>
      <button
        disabled={isBackBtnDisabled as boolean}
        onClick={handleBackBtnClick}
        className={isBackBtnDisabled ? 'disabledBtn' : ''}>
        Back
      </button>
      <button
        disabled={isForwardBtnDisabled as boolean}
        className={isForwardBtnDisabled ? 'disabledBtn' : ''}
        onClick={handleContinueBtnClick}
      >
        {isOnPlayerInfo ? 'Start game' : "Continue"}
      </button>
    </section>
  )
}

export default DirectionBtns