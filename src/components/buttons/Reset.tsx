import React from 'react'
import { useContext } from 'react';
import { FC } from 'react';
import { GameObj, ResetButtonProps } from '../../interfaces/interfaces';
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers';

const Reset: FC<ResetButtonProps> = ({ resetBtnTxt }) => {
    const { setPlayer1, setPlayer2, setBot, versusType, player2, player1, bot } = useContext(SettingsContext)
    const { setIsGameDone, setIsStaleMate, isGameDone, isStaleMate, setCurrentTurn, currentTurn, setRedLine2ClassName, setRedLineClassName } = useContext(GameContext)
    const { setIsSideModalOn, setIsResultModalOn } = useContext(ModalContext);
    const { isBot, isTwoPlayer } = versusType;

    const didGameStart = (player1?.spotsChosen?.length || player2?.spotsChosen?.length || bot?.spotsChosen?.length);
    const _pointerEvents = !didGameStart ? 'none' : 'initial';

    const resetGameUI = () => {
        const _player1 = { ...player1, spotsChosen: [] };
        let game: GameObj = JSON.parse(localStorage.getItem('game') as string)
        game = { ...game, player1: _player1 }
        setPlayer1(_player1);

        if (isTwoPlayer) {
            const _player2 = { ...player2, spotsChosen: [] };
            game = { ...game, player2: _player2 }
            setPlayer2(_player2);
        };

        if (isBot) {
            const _bot = { ...bot, spotsChosen: [] }
            game = { ...game, bot: _bot }
            setBot(_bot);
        };

        !currentTurn.isPlayerOne && setCurrentTurn(isTwoPlayer ? { isPlayerOne: true, isPlayerTwo: false } : { isPlayerOne: true, isBot: false });
        isGameDone && setIsGameDone(false);
        isStaleMate && setIsStaleMate(false);
        game.isDone && delete game.isDone;
        game.isStaleMate && delete game.isStaleMate
        game.redLineClassName && delete game.redLineClassName;
        game.redLine2ClassName && delete game.redLine2ClassName;
        localStorage.setItem('game', JSON.stringify(game) as string);
        setRedLine2ClassName("");
        setRedLineClassName("");
        setIsResultModalOn(false)
        setIsSideModalOn(false);
    }

    const handleResetGameBtnClick = () => {
        if (isGameDone) {
            resetGameUI();
            return;
        };
        const willResetGame = window.confirm('Are you sure you want to reset this game?');
        willResetGame && resetGameUI();
    };




    return <button onClick={handleResetGameBtnClick} disabled={!didGameStart} style={{ pointerEvents: _pointerEvents }}>{resetBtnTxt ?? "Reset"}</button>
}

export default Reset