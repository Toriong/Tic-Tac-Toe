import React, { FC } from 'react'
import { useContext } from 'react';
import { GameContext, SettingsContext } from '../../provider/Providers';
import '../../css/modals/sideModal.css'
import { SideModalProps } from '../../interfaces/interfaces';
import { json } from 'stream/consumers';
import ResetBtn from '../buttons/Reset';
import useGetWidth from '../../customHooks/useGetWidth';

// End Game
// Reset Game

const SideModal: FC = () => {
    const { setPlayer1, setPlayer2, setBot, versusType, player2, player1, bot } = useContext(SettingsContext)
    const { setIsGameDone, setIsStaleMate, isGameDone, isStaleMate, setCurrentTurn, currentTurn } = useContext(GameContext)
    const { isBot, isTwoPlayer } = versusType;


    const handleEndGameBtnClick = () => {
        // GOAL: when the user presses on the end game button, take the user to the first page and clear the local storage
    };

    // GOAL: disable the scroll when the user is on the mobile and the side Modal is on 


    return (
        <div className='sideModal'>
            <div>
                <ResetBtn />
                <button onClick={handleEndGameBtnClick}>
                    End game
                </button>
            </div>
        </div>
    )
}

export default SideModal