import React from 'react'
import { useContext } from 'react'
import { FC } from 'react'
import { BsCircle } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'
import { GameContext, SettingsContext } from '../../provider/Providers'
import RedLine from './RedLine'


const TicTacToeSpace: FC<TicTacToeSpaceProps> = ({ gridPosition, setWillCheckIfPlayerWon }) => {
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
    if (versusType.isTwoPlayer) {
      const _player = { ...player, spotsChosen: player?.spotsChosen?.length ? [...player.spotsChosen, gridPosition] : [gridPosition] };
      // localStorage.setItem(`${player.name}`, JSON.stringify(_player));
      updatePlayer(_player as Object);
    };
    setWillCheckIfPlayerWon(true);
  }



  return (
    <td defaultValue={JSON.stringify(gridPosition)} onClick={handleOnClick} style={{ pointerEvents: (isBot || wasSpotChosen || isGameDone) ? 'none' : 'auto' }}>
      {didPlayer1PickSpot && (player1.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didPlayer2PickSpot && (player2.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {didBotPickSpot && (bot.isXChosen ? <MdOutlineClose id='XShape' /> : <BsCircle id='OShape' />)}
      {/* {(!isStaleMate && isGameDone) && <RedLine gridPosition={gridPosition as number} />} */}
    </td>
  )
}

export default TicTacToeSpace