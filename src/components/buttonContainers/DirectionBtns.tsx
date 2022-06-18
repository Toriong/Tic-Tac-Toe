import React from 'react'
import { FC } from 'react'
import { DirectionBtnsProps } from '../../interfaces/interfaces'
import history from '../../history/history'
import { HookBooleanVal } from '../../types/types'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import '../../css/directionBtnsContainer.css'


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
      setCurrentTurn(currentTurn => { return { ...currentTurn, isPlayerOne: true } });
      history.push('/game');
    }
    setCompRenderToggle(!compRenderToggle)
  }

  // if the user is on the game page and then presses the back button or changes the url, notify the user the following: 'You are in the middle of a game. Are you sure you want to leave the game? Progress might not be saved.'  


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
        className={isBackBtnDisabled && 'disabledBtn'}>
        Back
      </button>
      <button
        disabled={isForwardBtnDisabled as boolean}
        className={isForwardBtnDisabled && 'disabledBtn'}
        onClick={handleContinueBtnClick}
      >
        {isOnPlayerInfo ? 'Start game' : "Continue"}
      </button>
    </section>
  )
}

export default DirectionBtns