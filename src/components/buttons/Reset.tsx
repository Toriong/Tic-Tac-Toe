import React from 'react'
import { useContext } from 'react';
import { FC } from 'react';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const Reset: FC = () => {
    const { setPlayer1, setPlayer2, setBot, versusType, player2, player1, bot } = useContext(SettingsContext)
    const { setIsGameDone, setIsStaleMate, isGameDone, isStaleMate, setCurrentTurn, currentTurn } = useContext(GameContext)
    const { setIsSideModalOn } = useContext(ModalContext)
    const { isBot, isTwoPlayer } = versusType;

    // Write an article about this
    const selectionsArray = [player1?.spotsChosen?.length && (player1?.spotsChosen as Array<number>), player2?.spotsChosen?.length && (player2?.spotsChosen as Array<number>), bot?.spotsChosen?.length && (bot?.spotsChosen as Array<number>)]
    const didGameStart = selectionsArray.find(val => !!val === true);


    const handleResetGameBtnClick = () => {
        const willResetGame = window.confirm('Are you sure you want to reset this game?')
        if (willResetGame) {
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
            !currentTurn.isPlayerOne && setCurrentTurn(currentTurn => { return { ...currentTurn, isPlayerOne: true } });
            isGameDone && setIsGameDone(false);
            isStaleMate && setIsStaleMate(false);
            localStorage.removeItem('isGameDone');
            setIsSideModalOn(false);
        }
    }



    return <button onClick={handleResetGameBtnClick} disabled={!didGameStart} style={{ pointerEvents: !didGameStart ? 'none' : 'initial' }}>Reset</button>
}

export default Reset