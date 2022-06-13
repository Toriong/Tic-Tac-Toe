import React from 'react'
import { FC } from 'react'
import { DirectionBtnsProps } from '../../interfaces/interfaces'
import '../../css/directionBtnsContainer.css'

// CASE: the user presses the continue button, the user is on the first versus selection section
// GOAL: enter player name section
// the user is taken to the player name section 
// the user is on first section of the app (the versus type section is '\')
// the path is '/'
// get the current path 

const DirectionBtns:FC<DirectionBtnsProps> = ({_isBackBtnDisabled, _isForwardBtnDisabled}) => {
  const [isBackBtnDisabled,] = _isBackBtnDisabled;
  const [isForwardBtnDisabled] = _isForwardBtnDisabled;

  const handleForwardBtnClick = ():void => {
      console.log('hello there')
  }
  
  return (
    <section className='directionBtnSec'>
      <button disabled={isBackBtnDisabled ? true : false}>Back</button>
      <button disabled={isForwardBtnDisabled ? true : false}>Continue</button>
      </section>
  )
}

export default DirectionBtns