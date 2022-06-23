import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ModalContext } from '../provider/Providers'

const Blocker = () => {
    const { isResultModalOn, setIsResultModalOn, isGameOnNotifyModalOn } = useContext(ModalContext)

    const handleOnClick = () => { setIsResultModalOn(false) };

    useEffect(() => {
        console.log("isResultModalOn: ", isResultModalOn)
    })

    // GOAL: present the blocker when the modal that tells the user that a game is on is displayed onto the screen 

    return (isResultModalOn || isGameOnNotifyModalOn) ? <div className='blocker' onClick={!isGameOnNotifyModalOn ? handleOnClick : () => { }} /> : null;
}

export default Blocker