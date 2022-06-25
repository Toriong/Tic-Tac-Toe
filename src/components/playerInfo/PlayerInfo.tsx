import React, { MouseEvent, useLayoutEffect } from 'react'
import { FC } from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import { MdOutlineClose } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { GameObj, Player, PlayerInfoProps } from '../../interfaces/interfaces';
import { HookBooleanVal, PlayerState, SelectedBtnStylesObj } from '../../types/types';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/gameSettings/playerInfo.css'
import { useRef } from 'react';



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
      isPlayer1 ? setIsErrorOnPlayer2(_name.length > 10) : setIsErrorOnPlayer1(_name.length > 10)
      // setDidErrorOccur(true);
    } else {
      setDidErrorOccur(false);
      setIsErrorOnPlayer1(false);
      setIsErrorOnPlayer2(false);
      setPlayer(val => { return { ...val, name: _name } })
      setWillSaveNameChanges(true);
      debugger
    };
    setIsNoInput(false);
  }

  // CASE: player one inputs a name

  // GOAL: save the changes into local storage under the name of 'game'


  // write a test for this function
  const saveNameChanges = (name: string, game: GameObj): void => {
    let _player: Player;
    let _game: GameObj = { player1: (player1 as Player) }
    if (isPlayer1 && game.player1) {
      _player = { ...game.player1, name: name };
      _game = { ...game, player1: _player };
    }

    if (isPlayer1) {
      _player = { ...player, name: name };
      _game = { ...game, player1: _player };
    }

    if (!isPlayer1 && game.player2) {
      _player = { ...game.player2, name: name };
      _game = { ...game, player2: _player };
    }

    if (!isPlayer1) {
      _player = { ...player, name: name };
      _game = { ...game, player2: _player };
    }

    localStorage.setItem('game', JSON.stringify(_game));
    setWillSaveNameChanges(false);
  }


  useEffect(() => {
    const game: (null | GameObj) = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string)


    if (willSaveNameChanges && isPlayer1 && game?.player1) {
      const _player1: Player = { ...game.player1, name: name }
      const _game: GameObj = { ...game, player1: _player1 };
      localStorage.setItem('game', JSON.stringify(_game));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges && isPlayer1 && game && !game.player1) {
      const player1: Player = { ...player, name: name };
      const _game: GameObj = { ...game, player1 };
      localStorage.setItem('game', JSON.stringify(_game));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges && !isPlayer1 && game && !game?.player2) {
      // the first character change to player 2's name 
      const player2: Player = { ...player, name: name };
      const _game: GameObj = { ...game, player2 };
      localStorage.setItem('game', JSON.stringify(_game));
      setWillSaveNameChanges(false);
    } else if (willSaveNameChanges && !isPlayer1 && game?.player2) {
      // if the player 2 exist in the local storage, then update the local storage with player 2's local storage values 
      saveNameChanges(name as string, game);

    }
    debugger


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