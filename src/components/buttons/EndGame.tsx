import React from 'react'
import { useContext } from 'react';
import { FC } from 'react'
import history from '../../history/history';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const EndGame: FC = () => {
    const { setIsSideModalOn } = useContext(ModalContext);
    const { setPlayer1, setPlayer2, setBot, setVersusType } = useContext(SettingsContext)
    const { setIsGameBeingPlayed, setIsGameDone, isGameDone, setIsStaleMate, setRedLineClassName, setRedLine2ClassName } = useContext(GameContext)

    const resetGameUI = () => {
        setPlayer1({ name: 'Player 1', isXChosen: false, spotsChosen: [], isPlayer1: true });
        setPlayer2({ name: 'Player 2', isXChosen: false, spotsChosen: [] });
        setBot({ isBot: true });
        setVersusType({ isBot: false, isTwoPlayer: false });
        setIsGameBeingPlayed(false);
        setIsGameDone(false);
        setIsStaleMate(false);
        setRedLine2ClassName("");
        setRedLineClassName("");
        localStorage.clear();
        history.push('/');
        setIsSideModalOn(false);
    }

    const handleEndGameBtnClick = () => {
        const willEndGame = !isGameDone && window.confirm('Are you sure you want to end the game? Game settings will be set to default.');
        if (willEndGame) {
            resetGameUI();
            return;
        };
        resetGameUI();
    };

    return <button onClick={handleEndGameBtnClick}>End game</button>
}

export default EndGame