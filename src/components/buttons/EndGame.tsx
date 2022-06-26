import React from 'react'
import { useContext } from 'react';
import { FC } from 'react'
import useNavigate from '../../customHooks/useNavigate';
import { EndGameBtnProps } from '../../interfaces/interfaces';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const EndGame: FC<EndGameBtnProps> = ({ isOnResultsModal }) => {
    const { setIsSideModalOn, setIsResultModalOn } = useContext(ModalContext);
    const { setPlayer1, setPlayer2, setBot, setVersusType } = useContext(SettingsContext)
    const { navigateToSec } = useNavigate();
    const { setIsGameDone, isGameDone, setIsStaleMate, setRedLineClassName, setRedLine2ClassName } = useContext(GameContext)

    const resetGameUI = () => {
        setPlayer1({ name: 'Player 1', isXChosen: false, spotsChosen: [], isPlayer1: true });
        setPlayer2({ name: 'Player 2', isXChosen: false, spotsChosen: [] });
        setBot({ isBot: true, spotsChosen: [] });
        setVersusType({ isBot: false, isTwoPlayer: false });
        setIsGameDone(false);
        setIsStaleMate(false);
        setRedLine2ClassName("");
        setRedLineClassName("");
        navigateToSec(1)
        localStorage.clear();
        isOnResultsModal ? setIsResultModalOn(false) : setIsSideModalOn(false);
    }

    const handleEndGameBtnClick = () => {
        if (!isGameDone) {
            const willEndGame = window.confirm('Are you sure you want to end the game? Game settings will be set to default.');
            willEndGame && resetGameUI();
            return;
        };
        resetGameUI();
    };

    return <button onClick={handleEndGameBtnClick}>End game</button>
}

export default EndGame