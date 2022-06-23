import React from 'react'
import { FC } from 'react';
import '../../css/playerInfoSec.css';
import { Player } from '../../interfaces/interfaces';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import PlayerInfo from '../playerInfo/PlayerInfo';



const PlayerInfoSec: FC = () => {
  const { player1, player2, setPlayer2, setPlayer1, versusType } = useContext(SettingsContext);

  return (
    <section className='playerInfoSec'>
      {versusType.isTwoPlayer ?
        <>
          <PlayerInfo player={player1 as Player} setPlayer={setPlayer1} />
          <PlayerInfo player={player2 as Player} setPlayer={setPlayer2} />
        </>
        :
        <PlayerInfo player={player1 as Player} setPlayer={setPlayer1} />
      }
    </section>
  )
}

export default PlayerInfoSec