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
  const { setPlayer2, setPlayer1, setBot, player1, player2, versusType, wasShapeBtnClicked, setWasShapeBtnClicked, bot, didErrorOccur, setDidErrorOccur, currentNamePlayer1, currentNamePlayer2, setCurrentNamePlayer1, setCurrentNamePlayer2 } = useContext(SettingsContext);
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
      setPlayer(val => { return { ...val, name: _name } });
      if (_name.length <= 10) {
        setWillSaveNameChanges(true);
        isPlayer1 ? setIsErrorOnPlayer1(false) : setIsErrorOnPlayer2(false);
      } else if (_name.length > 10) {
        isPlayer1 ? setIsErrorOnPlayer1(true) : setIsErrorOnPlayer2(true);
      }
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


  // write a test for this function
  const saveNameChanges = (name: string): void => {
    const game: (null | GameObj) = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string);
    let _player: Player;
    let _game: GameObj = { player1: (player1 as Player) }
    if (isPlayer1 && game?.player1) {
      _player = { ...game.player1, name: name };
      _game = { ...game, player1: _player };
    }

    if (isPlayer1) {
      _player = { ...player, name: name };
      _game = { ...game, player1: _player };
    }

    if (!isPlayer1 && game?.player2) {
      _player = { ...game.player2, name: name };
      _game = { ...game, player2: _player };
    }

    if (!isPlayer1) {
      _player = { ...player, name: name };
      _game = { ...(game as GameObj), player2: _player };
    }

    localStorage.setItem('game', JSON.stringify(_game));
    setWillSaveNameChanges(false);
  }

  // if player1, then save changes for player2 
  const saveShapeChoice = (isXChosen: boolean, willUpdateOtherUser?: boolean, willUpdateBot?: boolean) => {
    const game: (null | GameObj) = localStorage.getItem('game') && JSON.parse(localStorage.getItem('game') as string);
    let _player: Player = player;
    let _game: GameObj = { player1: (player1 as Player) };

    if (willUpdateBot) {
      const _bot: Player = { isXChosen: isXChosen, spotsChosen: [] };
      setBot(_bot);
      setWillSaveShapeChanges(false);
      localStorage.setItem('game', JSON.stringify({ ...game, bot: _bot }))
      return;
    }

    if (isPlayer1 && ((willUpdateOtherUser && game?.player2) || game?.player1)) {
      const playerInfo = willUpdateOtherUser ? (game.player2 as Player) : game.player1
      _player = { ...playerInfo, isXChosen: isXChosen };
      const playerFieldName = willUpdateOtherUser ? 'player2' : 'player1';
      _game = { ...game, [playerFieldName]: _player };
    }

    if (isPlayer1) {
      const playerInfo: Player = willUpdateOtherUser ? (player2 as Player) : player;
      _player = { ...playerInfo, isXChosen: isXChosen };
      const playerFieldName = willUpdateOtherUser ? 'player2' : 'player1';
      _game = { ...(game as GameObj), [playerFieldName]: _player }
    }

    if (!isPlayer1 && ((willUpdateOtherUser && game?.player1) || game?.player2)) {
      const playerInfo = willUpdateOtherUser ? game.player1 : (game.player2 as Player)
      _player = { ...playerInfo, isXChosen: isXChosen };
      const playerFieldName = willUpdateOtherUser ? 'player1' : 'player2';
      _game = { ...game, [playerFieldName]: _player };
    }

    if (!isPlayer1) {
      const playerInfo: Player = willUpdateOtherUser ? (player1 as Player) : player;
      _player = { ...playerInfo, isXChosen: isXChosen };
      const playerFieldName = willUpdateOtherUser ? 'player1' : 'player2';
      _game = { ...(game as GameObj), [playerFieldName]: _player }
    }

    if (willUpdateOtherUser) {
      isPlayer1 ? setPlayer2(_player) : setPlayer1(_player)
    }

    localStorage.setItem('game', JSON.stringify(_game));
    setWillSaveShapeChanges(false);
  }



  useEffect(() => {
    if (willSaveNameChanges) {
      saveNameChanges(name as string);
    }

    if (willSaveShapeChanges) {
      // save for changes for current user
      saveShapeChoice(!!isXChosen);
      // save for changes for the other user
      versusType.isTwoPlayer ? saveShapeChoice(!isXChosen, true) : saveShapeChoice(!isXChosen, false, true)
    }

  }, [willSaveNameChanges, willSaveShapeChanges]);

  useLayoutEffect(() => {
    const { isTwoPlayer, isBot } = versusType;

    if ((isTwoPlayer && (((player1.isXChosen !== false) && (player2.isXChosen !== false)) || (player1.isXChosen || player2.isXChosen))) || (isBot && (player1.isXChosen || bot.isXChosen))) {
      setWasShapeBtnClicked(true);
    }

  }, []);




  const handleShapeBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    !wasShapeBtnClicked && setWasShapeBtnClicked(true);
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
  };



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