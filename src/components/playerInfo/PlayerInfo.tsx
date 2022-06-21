import React, { MouseEvent, useLayoutEffect } from 'react'
import { FC } from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import { MdOutlineClose } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { Player, PlayerInfoProps } from '../../interfaces/interfaces';
import { HookBooleanVal, SelectedBtnStylesObj } from '../../types/types';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import '../../css/gameSettings/playerInfo.css'
import { brotliCompress } from 'zlib';



const PlayerInfo: FC<PlayerInfoProps> = ({ player, setPlayer }) => {
  const { name, isXChosen, isPlayer1 }: Player = player;
  const { setPlayer2, setPlayer1, player1, player2, versusType, setBot, bot } = useContext(SettingsContext);
  const [willSaveNameChanges, setWillSaveNameChanges]: HookBooleanVal = useState(false);
  const [willSaveShapeChanges, setWillSaveShapeChanges]: HookBooleanVal = useState(false);


  // what is exactly is HTMLInputElement?
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer(val => { return { ...val, name: event.target.value } })
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
      if (isPlayer1) {
        const _player1 = player1 && JSON.parse(player1);
        const player1ObjToSave = _player1 ? { ..._player1, isXChosen } : { isXChosen };
        localStorage.setItem('Player 1', JSON.stringify(player1ObjToSave))
        if (versusType.isTwoPlayer) {
          setPlayer2(player1 => { return { ...player1, isXChosen: !isXChosen } })
          const _player2 = player2 && JSON.parse(player2);
          const player2ObjToSave = _player2 ? { ..._player2, isXChosen: !isXChosen } : { isXChosen: !isXChosen };
          localStorage.setItem('Player 2', JSON.stringify(player2ObjToSave))
        } else {
          const _bot = bot ? { ...bot, isXChosen: !isXChosen } : { isXChosen: !isXChosen };
          setBot(_bot);
          localStorage.setItem('Bot', JSON.stringify(_bot))
        }
      } else {
        const _player2 = player2 && JSON.parse(player2);
        const player2ObjToSave = _player2 ? { ..._player2, isXChosen } : { isXChosen };
        localStorage.setItem('Player 2', JSON.stringify(player2ObjToSave))
        setPlayer1(player1 => { return { ...player1, isXChosen: !isXChosen } })
        const _player1 = player1 && JSON.parse(player1);
        const player1ObjToSave = _player1 ? { ..._player1, isXChosen: isXChosen ? false : true } : { isXChosen: isXChosen ? false : true };
        localStorage.setItem('Player 1', JSON.stringify(player1ObjToSave))
      };
      setWillSaveShapeChanges(false);
    }
  }, [willSaveNameChanges, willSaveShapeChanges])


  const handleShapeBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const isXChosen = event.currentTarget.name === 'X';
    setPlayer(player => { return { ...player, isXChosen } })
    setWillSaveShapeChanges(true);
  }

  let xShapeStyles: SelectedBtnStylesObj = {};
  let oShapeStyles: SelectedBtnStylesObj = {};
  if (isPlayer1 && isXChosen) {
    xShapeStyles = { backgroundColor: 'darkgray' };
  } else if ((isPlayer1 && !isXChosen) && (player2.isXChosen || bot?.isXChosen)) {
    oShapeStyles = { backgroundColor: 'darkgray' };
  } else if (!isPlayer1 && isXChosen) {
    xShapeStyles = { backgroundColor: 'darkgray' };
  } else if ((!isPlayer1 && !isXChosen) && player1.isXChosen) {
    oShapeStyles = { backgroundColor: 'darkgray' }
  }



  return (
    <div className='playerInfo'>
      <section>
        <h3>{isPlayer1 ? "Player 1's name: " : "Player 2's name: "}</h3>
        <div>
          <input
            defaultValue={name as string}
            onChange={event => { handleOnChange(event) }}
          />
        </div>
      </section>
      <section className='shapeSelectionSec'>
        <h3>Select a shape:</h3>
        <div className='shapeButtonsContainer'>
          <button name='X' id='XShape' style={xShapeStyles as Object} onClick={event => { handleShapeBtnClick(event) }}>
            <MdOutlineClose />
          </button>
          <button name='O' id='OShape' style={oShapeStyles as Object} onClick={event => { handleShapeBtnClick(event) }}>
            <BsCircle />
          </button>
        </div>
      </section>
    </div>
  )
}

export default PlayerInfo