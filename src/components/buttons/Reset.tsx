import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { FC } from 'react';
import { ResetButtonProps } from '../../interfaces/interfaces';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const Reset: FC<ResetButtonProps> = ({ resetBtnTxt }) => {
    const { setPlayer1, setPlayer2, setBot, versusType, player2, player1, bot } = useContext(SettingsContext)
    const { setIsGameDone, setIsStaleMate, isGameDone, isStaleMate, setCurrentTurn, currentTurn, setRedLine2ClassName, setRedLineClassName } = useContext(GameContext)
    const { setIsSideModalOn, setIsResultModalOn } = useContext(ModalContext);
    const { isBot, isTwoPlayer } = versusType;

    const didGameStart = player1?.spotsChosen?.length;
    const _pointerEvents = !didGameStart ? 'none' : 'initial';

    const resetGameUI = () => {
        const _player1 = { ...player1, spotsChosen: [] };
        localStorage.setItem('Player 1', JSON.stringify(_player1));
        setPlayer1(_player1);
        if (isTwoPlayer) {
            const _player2 = { ...player2, spotsChosen: [] };
            localStorage.setItem('Player 2', JSON.stringify(_player2));
            setPlayer2(_player2);
        }
        if (isBot) {
            const _bot = { ...bot, spotsChosen: [] }
            localStorage.setItem('bot', JSON.stringify(_bot));
            setBot(_bot);
        };
        !currentTurn.isPlayerOne && setCurrentTurn(isTwoPlayer ? { isPlayerOne: true, isPlayerTwo: false } : { isPlayerOne: true, isBot: false });
        isGameDone && setIsGameDone(false);
        isStaleMate && setIsStaleMate(false);
        localStorage.removeItem('isGameDone');
        localStorage.getItem('isStaleMate') && localStorage.removeItem('isStaleMate');
        setRedLine2ClassName("");
        setRedLineClassName("");
        setIsResultModalOn(false)
        setIsSideModalOn(false);
    }

    const handleResetGameBtnClick = () => {
        const willResetGame = !isGameDone && window.confirm('Are you sure you want to reset this game?')
        if (willResetGame) {
            resetGameUI();
            return;
        };
        resetGameUI();
    };




    return <button onClick={handleResetGameBtnClick} disabled={!didGameStart} style={{ pointerEvents: _pointerEvents }}>{resetBtnTxt ?? "Reset"}</button>
}

export default Reset