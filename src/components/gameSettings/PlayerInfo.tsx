import React from 'react'
import { FC } from 'react';
import { PlayerCompProp } from '../../interfaces/interfaces';
import { PlayerState } from '../../types/types';
import '../../css/playerInfoSec.css';

const PlayerInfo:FC<PlayerCompProp> = ({_player1, _player2}) => {
  const [player1, setPlayer1]:PlayerState = _player1;
  const [player2, setPlayer2]:PlayerState = _player2 ?? [];
  
  return (
    <section className='playerInfoSec'>
        
    </section>
  )
}

export default PlayerInfo