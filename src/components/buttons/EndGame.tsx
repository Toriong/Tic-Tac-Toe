import React from 'react'
import { useContext } from 'react';
import { FC } from 'react'
import history from '../../history/history';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const EndGame: FC = () => {
    const { setIsSideModalOn } = useContext(ModalContext);
    const { setPlayer1, setPlayer2, setBot, setVersusType } = useContext(SettingsContext)
    const { setIsGameBeingPlayed, setIsGameDone } = useContext(GameContext)

    const handleEndGameBtnClick = () => {
        const willEndGame = window.confirm('Are you sure you want to end the game? Game settings will be set to default.');
        if (willEndGame) {
            setPlayer1({ name: 'Player 1', isXChosen: false, spotsChosen: [], isPlayer1: true });
            setPlayer2({ name: 'Player 2', isXChosen: false, spotsChosen: [] });
            setBot({ isBot: true });
            setVersusType({ isBot: false, isTwoPlayer: false });
            setIsGameBeingPlayed(false);
            setIsGameDone(false);
            localStorage.clear();
            history.push('/');
            setIsSideModalOn(false);
        }
    };

    return <button onClick={handleEndGameBtnClick}>End game</button>
}

export default EndGame