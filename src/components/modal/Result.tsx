import React, { useContext } from 'react'
import { GameContext, SettingsContext } from '../../provider/Providers'
import '../../css/modals/result.css'

const Result = () => {
    const { player1, player2 } = useContext(SettingsContext);
    const { currentTurn } = useContext(GameContext);

    if (currentTurn.isPlayerOne) {
        var winner = player1.name;
    } else if (currentTurn.isPlayerTwo) {
        winner = player2.name
    } else {
        winner = 'Bot'
    }

    return (
        <div className='resultModal'>
            <section>
                <span>WINNER: {winner}</span>
            </section>
            <section>
                <button>End game</button>
                <button>Play again</button>
            </section>
        </div>
    )
}

export default Result