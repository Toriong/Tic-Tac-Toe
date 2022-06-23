import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../provider/Providers'

const Blocker = () => {
    const { isResultModalOn, setIsResultModalOn } = useContext(ModalContext)

    const handleOnClick = () => { setIsResultModalOn(false) };

    // GOAL: present the blocker when the modal that tells the user that a game is on is displayed onto the screen 

    return isResultModalOn ? <div className='blocker' onClick={handleOnClick} /> : null;
}

export default Blocker