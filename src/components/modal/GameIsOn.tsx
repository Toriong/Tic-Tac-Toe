import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import '../../css/modals/centerModal.css'
import { ModalContext, ModalProvider } from '../../provider/Providers'
import EndGame from '../buttons/EndGame'


// GOAL: present this modal when the user is on game section then goes back to the previous page 

// CASE: the user goes back to the previous page
// GOAL: when the user goes to the previous page or any of the pages that are not the game section, present the modal
// the modal is presented onto the screen 
// the user is not on the game section 
// check if the user is not on the game section
// check if the user has a game on


// CASE: the user goes back to the previous page, and then goes back to the game section 
// GOAL: when the user goes back to any of the pages that are not game-related, then goes back to the game section, close the modal

const GameIsOn = () => {
    const { setIsGameOnNotifyModalOn } = useContext(ModalContext);

    return (
        <div className='modal'>
            <section>
                <span>Game is in progress.</span>
            </section>
            <section>
                <button>Back to game</button>
                <EndGame />
            </section>
        </div>
    )
}

export default GameIsOn