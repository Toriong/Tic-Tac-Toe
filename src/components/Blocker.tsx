import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../provider/Providers'

const Blocker = () => {
    const { isResultModalOn, setIsResultModalOn, isGameOnNotifyModalOn } = useContext(ModalContext)

    const handleOnClick = () => { setIsResultModalOn(false) };


    return (isResultModalOn || isGameOnNotifyModalOn) ? <div className='blocker' onClick={!isGameOnNotifyModalOn ? handleOnClick : () => { }} /> : null;
}

export default Blocker