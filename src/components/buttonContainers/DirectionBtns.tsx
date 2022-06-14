import React from 'react'
import { FC } from 'react'
import { DirectionBtnsProps, DisabledBtnStyle, UseGetPathVals } from '../../interfaces/interfaces'
import '../../css/directionBtnsContainer.css'
import history from '../../history/history'

// CASE: the user presses the continue button, the user is on the first versus selection section
// GOAL: take the user to player info section
// the user is taken to the player name section 
// the user is on first section of the app (the versus type section is '\')
// the path is '/'
// get the current path 

const DirectionBtns:FC<DirectionBtnsProps> = ({_isBackBtnDisabled, _isForwardBtnDisabled}) => {
  const path = window.location.pathname;
  const [isBackBtnDisabled,] = _isBackBtnDisabled;
  const [isForwardBtnDisabled] = _isForwardBtnDisabled;
  const isOnVersusSelection = path === '/';
  const isOnPlayerInfo = path === 'playerInfo'

  const disabledBtnStyles: DisabledBtnStyle = {
    color: 'grey',
    border: 'solid .001px grey'
  };



  
  const handleContinueBtnClick = ():void => {
    if (isOnVersusSelection) {
      history.push('/playerInfo');
      }
  }

  const handleBackBtnClick = (): void => {
    if (!isOnPlayerInfo) {
      history.push('/');
    }
  }
  
  return (
    <section className='directionBtnSec'>
      <button disabled={isBackBtnDisabled ? true : false} onClick={handleBackBtnClick} className={isBackBtnDisabled && 'disabledBtn'}>Back</button>
      <button
        disabled={isForwardBtnDisabled ? true : false}
        className={isForwardBtnDisabled && 'disabledBtn'}
        onClick={handleContinueBtnClick}
      >
        Continue
      </button>
      </section>
  )
}

export default DirectionBtns