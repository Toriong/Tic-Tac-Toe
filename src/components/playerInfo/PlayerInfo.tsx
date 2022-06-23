import React, { MouseEvent, useLayoutEffect } from 'react'
import { FC } from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import { MdOutlineClose } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { Player, PlayerInfoProps } from '../../interfaces/interfaces';
import { HookBooleanVal, SelectedBtnStylesObj } from '../../types/types';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/gameSettings/playerInfo.css'



const PlayerInfo: FC<PlayerInfoProps> = ({ player, setPlayer }) => {
  const { name, isXChosen, isPlayer1 }: Player = player;
  const { setPlayer2, setPlayer1, player1, player2, versusType, setBot, bot, didErrorOccur, setDidErrorOccur, currentNamePlayer1, currentNamePlayer2, setCurrentNamePlayer1, setCurrentNamePlayer2 } = useContext(SettingsContext);
  const [willSaveNameChanges, setWillSaveNameChanges]: HookBooleanVal = useState(false);
  const [willSaveShapeChanges, setWillSaveShapeChanges]: HookBooleanVal = useState(false);
  const [isErrorOnPlayer1, setIsErrorOnPlayer1]: HookBooleanVal = useState(false);
  const [isErrorOnPlayer2, setIsErrorOnPlayer2]: HookBooleanVal = useState(false);
  const [isNoInput, setIsNoInput] = useState(false);

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const _name = (event.target as HTMLInputElement).value;
    if (!_name) {
      setIsNoInput(true);
      setDidErrorOccur(true);
      isPlayer1 ? setIsErrorOnPlayer1(true) : setIsErrorOnPlayer2(true);
      return;
    }
    isPlayer1 ? setCurrentNamePlayer1(_name) : setCurrentNamePlayer2(_name);
    const otherPlayerName = versusType?.isTwoPlayer && (isPlayer1 ? currentNamePlayer2 : currentNamePlayer1);
    const isNameErrorForOtherPlayer = otherPlayerName && (otherPlayerName.length > 10)
    if (_name.length > 10) {
      setDidErrorOccur(true);
      isPlayer1 ? setIsErrorOnPlayer1(true) : setIsErrorOnPlayer2(true);
    } else if (isNameErrorForOtherPlayer && versusType.isTwoPlayer) {
      setPlayer(val => { return { ...val, name: _name } })
      setWillSaveNameChanges(true);
      isPlayer1 ? setIsErrorOnPlayer1(_name.length > 10) : setIsErrorOnPlayer2(_name.length > 10)
      setDidErrorOccur(true);
    } else {
      setDidErrorOccur(false);
      setIsErrorOnPlayer1(false);
      setIsErrorOnPlayer2(false);
      setPlayer(val => { return { ...val, name: _name } })
      setWillSaveNameChanges(true);
    };
  }





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
        localStorage.setItem('Player 1', JSON.stringify(player1ObjToSave));
        debugger
        if (versusType.isTwoPlayer) {
          setPlayer2(player1 => { return { ...player1, isXChosen: !isXChosen } })
          const _player2 = player2 && JSON.parse(player2);
          const player2ObjToSave = _player2 ? { ..._player2, isXChosen: !isXChosen } : { isXChosen: !isXChosen };
          localStorage.setItem('Player 2', JSON.stringify(player2ObjToSave))
        } else {
          const _bot = bot ? { ...bot, isXChosen: !isXChosen } : { isXChosen: !isXChosen };
          setBot(_bot);
          localStorage.setItem('Bot', JSON.stringify(_bot));
          debugger
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
    setPlayer(player => { return { ...player, isXChosen } });
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
        <div className='inputNameContainer'>
          <input
            defaultValue={name as string}
            style={{ color: (didErrorOccur && (isErrorOnPlayer1 || isErrorOnPlayer2)) ? 'red' : 'white' }}
            onKeyUp={event => { handleOnKeyUp(event) }}
          />
          {<span>
            {(didErrorOccur && (isErrorOnPlayer1 || isErrorOnPlayer2)) && (isNoInput ? '*Please enter in a name.' : "*Name can't be over 10 characters")}
          </span>}
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