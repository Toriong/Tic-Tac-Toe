import React from 'react'
import { FC } from 'react';
import '../../css/playerInfoSec.css';
import { Player } from '../../interfaces/interfaces';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import PlayerInfo from '../playerInfo/PlayerInfo';
import { useLayoutEffect } from 'react';



const PlayerInfoSec: FC = () => {
  const { player1, player2, setPlayer2, setPlayer1, versusType } = useContext(SettingsContext);


  // useLayoutEffect(() => {
  //   const isPlayer1DataSaved = !!localStorage.getItem('Player 1')
  //   if (!versusType.isTwoPlayer && !isPlayer1DataSaved) {
  //     const _player1 = { ...player1, isXChosen: true };
  //     setPlayer1(_player1);
  //     localStorage.setItem('Player 1', JSON.stringify(_player1));
  //   }
  // }, [])

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