import React, {MouseEvent, useLayoutEffect} from 'react'
import { FC } from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import { MdOutlineClose } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import '../../css/gameSettings/playerInfo.css'
import { Player, PlayerInfoProps } from '../../interfaces/interfaces';
import { HookBooleanVal, PlayerState } from '../../types/types';
import { FormEvent } from 'react';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useRef } from 'react';
import { useState } from 'react';



const PlayerInfo:FC<PlayerInfoProps> = ({player, setPlayer, isPlayer1}) => {
  const {name, isXChosen}:Player = player;
  const {setPlayer2, setPlayer1, player1, player2} = useContext(SettingsContext)
  const [willSaveNameChanges, setWillSaveNameChanges]: HookBooleanVal = useState(false);
  const [willSaveShapeChanges, setWillSaveShapeChanges]: HookBooleanVal = useState(false);

  useEffect(() => {
    console.log('player1: ', player1);
    console.log('player2: ', player2);
  })
  
  // what is exactly is HTMLInputElement?
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer(val => {return {...val, name: event.target.value}})
    setWillSaveNameChanges(true);
  };


   
  useEffect(() => {
    if (willSaveNameChanges) {
      const targetPlayer = isPlayer1 ? 'Player 1' : 'Player 2';
      localStorage.setItem(targetPlayer, JSON.stringify(name));
    }
  }, [willSaveNameChanges, willSaveShapeChanges])

  // CASE: the user choose X
  // GOAL: if the user clicks on the X, then insert a false boolean into for isXChosen for the current user, then for the other user insert a true boolean
  // for the other user, a true boolean is stored in the field of isXChosen
  // for the current user, store a false boolean into isXChosen
  // the current user chooses an X


  // CASE: the user choose o
  // GOAL: if the user clicks on the o, then insert a true boolean into for isXChosen

  const handleOBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('event: ', event.currentTarget.name)
    const isXChosen = event.currentTarget.name === ''
    setPlayer1(player => {return {...player, }})
  }

  const handleXBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('event: ', event.currentTarget.name)
  }



    

return (
      <div className='playerInfo'>
          <section>
              <h3>Name</h3>
          <input
            defaultValue={name as string}
            onChange={event => {handleOnChange(event)}}
          />
          </section>
        <section>
              <h3>Select a shape</h3>
              <div>
              <button name='X'onClick={event => {handleXBtnClick(event)}}>
                <MdOutlineClose/>
              </button>
              <button name='O' onClick={event => {handleOBtnClick(event)}}>
                <BsCircle/>
              </button>
              </div>
        </section>
    </div>
  )
}

export default PlayerInfo