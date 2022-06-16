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



const PlayerInfo:FC<PlayerInfoProps> = ({player, setPlayer}) => {
  const {name, isXChosen, isPlayer1}:Player = player;
  useEffect(() => {
    console.log('name: ', name)
  })
  const {setPlayer2, setPlayer1, player1, player2} = useContext(SettingsContext)
  const [willSaveNameChanges, setWillSaveNameChanges]: HookBooleanVal = useState(false);
  const [willSaveShapeChanges, setWillSaveShapeChanges]: HookBooleanVal = useState(false);

  
  // what is exactly is HTMLInputElement?
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer(val => {return {...val, name: event.target.value}})
    setWillSaveNameChanges(true);
  };


   
  useEffect(() => {
    const player1 = localStorage.getItem('Player 1');
    const player2 = localStorage.getItem('Player 2');
    if (willSaveNameChanges && player1 && isPlayer1) {
      const _player1 = JSON.parse(player1);
      localStorage.setItem('Player 1', JSON.stringify({ ..._player1, name: name }));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges && isPlayer1) {
      localStorage.setItem('Player 1', JSON.stringify({ name: name }));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges && player2) {
      const _player2 = JSON.parse(player2);
      localStorage.setItem('Player 2', JSON.stringify({ ..._player2, name: name }));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges) {
      localStorage.setItem('Player 2', JSON.stringify({ name: name }));
      setWillSaveNameChanges(false);
    }

    if (willSaveShapeChanges) {
      
      // CASE: current player chooses the X
      // GOAL: for the current player, store a true boolean for the isXChosen, for the other player, store a false boolean for isXChosen
      // it is saved into the local storage for the other user (for player 2)
      // a false boolean is stored into isXChosen for the other user (say player 2)
      // determine who the other user is by getting isPlayer1. if isPlayer1 is true, then the other user is player 2. if isPlayer1 is false, then the other user is player 1
      // it is saved into the local storage for the current user (player 1 for example)
      // a true boolean is stored into the current user (player 1 for example)
      // get who the current user is (either player 1 or player 2)
      // current user chooses x
      if (isPlayer1) {
        const _player1 = player1 && JSON.parse(player1);
        const player1ObjToSave = _player1 ? { ..._player1, isXChosen } : { isXChosen };
        localStorage.setItem('Player 1', JSON.stringify(player1ObjToSave))

        setPlayer2(player1 => { return { ...player1, isXChosen: !isXChosen } })
        const _player2 = player2 && JSON.parse(player2);
        const player2ObjToSave = _player2 ? { ..._player2, isXChosen: !isXChosen } : { isXChosen: !isXChosen };
        localStorage.setItem('Player 2', JSON.stringify(player2ObjToSave)) 
      } else {
        const _player2 = player2 && JSON.parse(player2);
        const player2ObjToSave = _player2 ? { ..._player2, isXChosen } : { isXChosen };
        localStorage.setItem('Player 2', JSON.stringify(player2ObjToSave))

        setPlayer1(player1 => { return { ...player1, isXChosen: !isXChosen } })
        const _player1 = player1 && JSON.parse(player1);
        const player1ObjToSave = _player1 ? { ..._player1, isXChosen: isXChosen ? false :true } : { isXChosen: isXChosen ? false :true };
        localStorage.setItem('Player 1', JSON.stringify(player1ObjToSave))
        
      }
      setWillSaveShapeChanges(false);
    }
  }, [willSaveNameChanges, willSaveShapeChanges])


  // BUG: when player 2 chooses X, player 1's isXChosen field remains true   
  // WHAT I WANT: when player 2 chooses X, store the opposite boolean into the field 'isXChosen' for player 1 

  // CASE: the user choose X
  // GOAL: if the user clicks on the X, then insert a false boolean into for isXChosen for the current user, then for the other user insert a true boolean
  // for the other user, a true boolean is stored in the field of isXChosen
  // for the current user, store a false boolean into isXChosen
  // the current user chooses an X


  // CASE: the user choose o
  // GOAL: if the user clicks on the o, then insert a true boolean into for isXChosen


  const handleShapeBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const isXChosen = event.currentTarget.name === 'X';
    setPlayer(player => {return {...player, isXChosen}})
    setWillSaveShapeChanges(true);
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
              <button name='X'onClick={event => {handleShapeBtnClick(event)}}>
                <MdOutlineClose/>
              </button>
              <button name='O' onClick={event => {handleShapeBtnClick(event)}}>
                <BsCircle/>
              </button>
              </div>
        </section>
    </div>
  )
}

export default PlayerInfo