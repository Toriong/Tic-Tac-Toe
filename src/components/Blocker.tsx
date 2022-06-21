import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../provider/Providers'

const Blocker = () => {
    const { isResultModalOn, setIsResultModalOn } = useContext(ModalContext)

    const handleOnClick = () => { setIsResultModalOn(false) };

    return isResultModalOn ? <div className='blocker' onClick={handleOnClick} /> : null;
}

export default Blocker