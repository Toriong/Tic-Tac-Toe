import React from 'react'
import { useContext } from 'react'
import { FC } from 'react'
import { BsCircle } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'
import { GameContext, SettingsContext } from '../../provider/Providers'


const TicTacToeSpace: FC<TicTacToeSpaceProps> = ({ gridPosition, setWillRotate }) => {
  const { player1, player2, bot, versusType, setPlayer1, setPlayer2 } = useContext(SettingsContext);
  const { currentTurn, isGameDone, isStaleMate } = useContext(GameContext);
  const { isPlayerOne, isBot } = currentTurn;
  const player = isPlayerOne ? player1 : player2;
  const updatePlayer = isPlayerOne ? setPlayer1 : setPlayer2;
  const didPlayer1PickSpot = !!player1?.spotsChosen?.length && player1?.spotsChosen.includes(gridPosition as number);
  const didPlayer2PickSpot = !!player2?.spotsChosen?.length && player2?.spotsChosen.includes(gridPosition as number)
  const didBotPickSpot = !!bot?.spotsChosen?.length && bot.spotsChosen.includes(gridPosition as number);
  const wasSpotChosen = didBotPickSpot || didPlayer1PickSpot || didPlayer2PickSpot;

  const handleOnClick = (): void => {
    const _player = { ...player, spotsChosen: player?.spotsChosen?.length ? [...player.spotsChosen, gridPosition] : [gridPosition] };
    localStorage.setItem(`${player.name}`, JSON.stringify(_player));
    updatePlayer(_player as Object);
    setWillRotate(true);
  }



  return (
    <td defaultValue={JSON.stringify(gridPosition)} onClick={handleOnClick} style={{ pointerEvents: (isBot || wasSpotChosen || isGameDone) ? 'none' : 'auto' }}>
      {didPlayer1PickSpot && (player1.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didPlayer2PickSpot && (player2.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didBotPickSpot && (bot.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
    </td>
  )
}

export default TicTacToeSpace