import React from 'react'
import { useContext } from 'react'
import history from '../../history/history'
import { ModalContext } from '../../provider/Providers'
import EndGame from '../buttons/EndGame'
import '../../css/modals/centerModal.css'


const GameIsOn = () => {
    const { setIsGameOnNotifyModalOn } = useContext(ModalContext);

    const handleBackToGameBtnClick = () => {
        history.push('/game');
        setIsGameOnNotifyModalOn(false);
    };

    return (
        <div className='modal notifyGameIsOn'>
            <section>
                <span>Game is in progress.</span>
            </section>
            <section>
                <button onClick={handleBackToGameBtnClick}>Back to game</button>
                <EndGame />
            </section>
        </div>
    )
}

export default GameIsOn