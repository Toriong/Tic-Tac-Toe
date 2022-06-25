import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { FC } from 'react'
import { BsCircle } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'
import { GameContext, ModalContext, SettingsContext } from '../../provider/Providers'


const TicTacToeSpace: FC<TicTacToeSpaceProps> = ({ gridPosition, setWillRotate, setGridSpotToSave }: { gridPosition: number, setWillRotate: Function, setGridSpotToSave: Function }) => {
  const { player1, player2, bot, setPlayer1, setPlayer2 } = useContext(SettingsContext);
  const { currentTurn, isGameDone } = useContext(GameContext);
  const { isSideModalOn } = useContext(ModalContext)
  const { isPlayerOne, isBot } = currentTurn;
  const player = isPlayerOne ? player1 : player2;
  const updatePlayer = isPlayerOne ? setPlayer1 : setPlayer2;
  const didPlayer1PickSpot = !!player1?.spotsChosen?.length && player1?.spotsChosen.includes(gridPosition as number);
  const didPlayer2PickSpot = !!player2?.spotsChosen?.length && player2?.spotsChosen.includes(gridPosition as number)
  const didBotPickSpot = !!bot?.spotsChosen?.length && bot.spotsChosen.includes(gridPosition as number);
  const wasSpotChosen = didBotPickSpot || didPlayer1PickSpot || didPlayer2PickSpot;

  const handleOnClick = (): void => {
    // GOAL: save the player spot chosen into the local storage 
    // the spots are updated for the current player and saved into the local storage
    // the new spot is added to the field of spotsChosen: [] (game.(the current player).spotsChosen)
    // the current player is accessed from the game object 
    // get the game object found from the local storage 
    // the current player identity is found
    // find the current player identity (either player one or player two)
    const _player = { ...player, spotsChosen: player?.spotsChosen?.length ? [...player.spotsChosen, gridPosition] : [gridPosition] };
    setGridSpotToSave({ isPlayerOne: isPlayerOne, spot: gridPosition });
    updatePlayer(_player as Object);
    setWillRotate(true);
  };




  return (
    <td defaultValue={JSON.stringify(gridPosition)} onClick={handleOnClick} style={{ pointerEvents: (isBot || wasSpotChosen || isGameDone || isSideModalOn) ? 'none' : 'auto' }}>
      {didPlayer1PickSpot && (player1.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didPlayer2PickSpot && (player2.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didBotPickSpot && (bot.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
    </td>
  )
}

export default TicTacToeSpace