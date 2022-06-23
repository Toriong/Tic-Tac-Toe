import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { FC } from 'react';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const Reset: FC = () => {
    const { setPlayer1, setPlayer2, setBot, versusType, player2, player1, bot } = useContext(SettingsContext)
    const { setIsGameDone, setIsStaleMate, isGameDone, isStaleMate, setCurrentTurn, currentTurn } = useContext(GameContext)
    const { setIsSideModalOn } = useContext(ModalContext)
    const { isBot, isTwoPlayer } = versusType;

    // Write an article about this
    // const selectionsArray = [!!player1?.spotsChosen?.length && !!(player1?.spotsChosen as Array<number>), player2?.spotsChosen?.length && (player2?.spotsChosen as Array<number>), bot?.spotsChosen?.length && (bot?.spotsChosen as Array<number>)]

    //CASE: the user is playing is against a bot 
    // GOAL: if there a selections made either by the current user or the or the bot that means that game has started

    // CASE: the user is playing against another player
    // GOAL: if there selection made by the player one, then the game has started 
    const didGameStart = player1?.spotsChosen?.length;
    const _pointerEvents = !didGameStart ? 'none' : 'initial';


    useEffect(() => {
        console.log('didGameStart: ', didGameStart);
        console.log('_pointerEvents: ', _pointerEvents)
    })
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
            !currentTurn.isPlayerOne && setCurrentTurn(isTwoPlayer ? { isPlayerOne: true, isPlayerTwo: false } : { isPlayerOne: true, isBot: false });
            isGameDone && setIsGameDone(false);
            isStaleMate && setIsStaleMate(false);
            localStorage.removeItem('isGameDone');
            localStorage.getItem('isStaleMate') && localStorage.removeItem('isStaleMate');
            setIsSideModalOn(false);
        }
    };




    return <button onClick={handleResetGameBtnClick} disabled={!didGameStart} style={{ pointerEvents: _pointerEvents }}>Reset</button>
}

export default Reset