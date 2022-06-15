import React from 'react'
import { FC } from 'react'
import { DirectionBtnsProps, DisabledBtnStyle, UseGetPathVals } from '../../interfaces/interfaces'
import '../../css/directionBtnsContainer.css'
import history from '../../history/history'
import { HookBooleanVal } from '../../types/types'
import { GiConsoleController } from 'react-icons/gi'

// CASE: the user presses the continue button, the user is on the first versus selection section
// GOAL: take the user to player info section
// the user is taken to the player name section 
// the user is on first section of the app (the versus type section is '\')
// the path is '/'
// get the current path 

const DirectionBtns:FC<DirectionBtnsProps> = ({_isBackBtnDisabled, _isForwardBtnDisabled, _compRenderToggle}) => {
  const path = window.location.pathname;
  const [isBackBtnDisabled,]:HookBooleanVal = _isBackBtnDisabled;
  const [isForwardBtnDisabled]:HookBooleanVal = _isForwardBtnDisabled;
  const [compRenderToggle, setCompRenderToggle]: HookBooleanVal = _compRenderToggle;
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === '/playerInfo';

  console.log('path: ', path)



  
  const handleContinueBtnClick = ():void => {
    if (isOnVersusSelection) {
      history.push('/playerInfo');
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
      <button disabled={isBackBtnDisabled as boolean} onClick={handleBackBtnClick} className={isBackBtnDisabled && 'disabledBtn'}>Back</button>
      <button
        disabled={isForwardBtnDisabled as boolean}
        className={isForwardBtnDisabled && 'disabledBtn'}
        onClick={handleContinueBtnClick}
      >
        {isOnPlayerInfo ? 'Start game': "Continue"}
      </button>
      </section>
  )
}

export default DirectionBtns