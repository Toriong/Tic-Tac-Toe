import React, { useContext } from 'react'
import { GameContext, SettingsContext } from '../../provider/Providers'
import '../../css/modals/centerModal.css'
import EndGame from '../buttons/EndGame';
import Reset from '../buttons/Reset';

const Result = () => {
    const { player1, player2 } = useContext(SettingsContext);
    const { currentTurn, isStaleMate } = useContext(GameContext);
    const resetBtnTxt = isStaleMate ? 'Play again' : undefined;

    if (currentTurn.isPlayerOne) {
        var winner = player1.name;
    } else if (currentTurn.isPlayerTwo) {
        winner = player2.name
    } else {
        winner = 'Bot'
    }

    return (
        <div className='modal'>
            <section>
                <span> {isStaleMate ? 'STALEMATE' : `WINNER: ${winner}`} </span>
            </section>
            <section>
                <EndGame isOnResultsModal={true} />
                <Reset resetBtnTxt={resetBtnTxt} />
            </section>
        </div>
    )
}

export default Result