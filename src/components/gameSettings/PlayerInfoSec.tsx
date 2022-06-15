import React from 'react'
import { FC } from 'react';
import '../../css/playerInfoSec.css';
import { Player, PlayerInfoSecProps } from '../../interfaces/interfaces';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import PlayerInfo from '../playerInfo/PlayerInfo';
import { GlobalValuesSettings } from '../../types/types';



const PlayerInfoSec:FC<PlayerInfoSecProps> = ({isTwoPlayer}) => {
  const { player1, player2, setPlayer2, setPlayer1 } = useContext(SettingsContext);
  
  
  return (
    <section className='playerInfoSec'>
      {isTwoPlayer ?
        <>
          <PlayerInfo player={player1 as Player} setPlayer={setPlayer1}/>
          <PlayerInfo player={player2 as Player} setPlayer={setPlayer2}/>
        </>
        :
        <PlayerInfo player={player1 as Player} setPlayer={setPlayer1}/>
      }        
    </section>
  )
}

export default PlayerInfoSec