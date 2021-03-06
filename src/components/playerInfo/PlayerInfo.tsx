import React, { MouseEvent, useLayoutEffect } from 'react'
import { FC } from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../../provider/Providers';
import { MdOutlineClose } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { GameObj, Player, PlayerInfoProps } from '../../interfaces/interfaces';
import { HookBooleanVal, SelectedBtnStylesObj } from '../../types/types';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/gameSettings/playerInfo.css'



const PlayerInfo: FC<PlayerInfoProps> = ({ player, setPlayer }) => {
  const { name, isXChosen, isPlayer1 }: Player = player;
  const { setPlayer2, setPlayer1, setBot, player1, player2, versusType, wasShapeBtnClicked, setWasShapeBtnClicked, bot, setDidErrorOccurPlayer1, setDidErrorOccurPlayer2, didErrorOccurPlayer1, didErrorOccurPlayer2, setCurrentNamePlayer1, setCurrentNamePlayer2, setIsSameName, isSameName } = useContext(SettingsContext);
  const updatePlayer = isPlayer1 ? setPlayer1 : setPlayer2;
  const [willSaveNameChanges, setWillSaveNameChanges]: HookBooleanVal = useState(false);
  const [willSaveShapeChanges, setWillSaveShapeChanges]: HookBooleanVal = useState(false);
  const [isLongNamePlayer1, setIsLongNamePlayer1]: HookBooleanVal = useState(false);
  const [isLongNamePlayer2, setIsLongNamePlayer2]: HookBooleanVal = useState(false);
  const [isNoInputPlayer1, setIsNoInputPlayer1]: HookBooleanVal = useState(false);
  const [isNoInputPlayer2, setIsNoInputPlayer2]: HookBooleanVal = useState(false);


  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePlayer(player => { return { ...player, name: event.target.value } });
    isPlayer1 ? setCurrentNamePlayer1(event.target.value) : setCurrentNamePlayer2(event.target.value);
    (event.target.value.length <= 10) && setWillSaveNameChanges(true);
  }




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

  const getErrorTxt = (): string => {
    if (isPlayer1 ? isLongNamePlayer1 : isLongNamePlayer2) {
      return "*Name can't be over 10 characters";
    }

    if (isPlayer1 ? isNoInputPlayer1 : isNoInputPlayer2) {
      return '*Please enter in a name';
    }

    return "*Name cannot be the same";
  }

  const getPlayerErrorBooleans = () => {
    if (isPlayer1) {
      return isLongNamePlayer1 || isNoInputPlayer1
    }

    return isLongNamePlayer2 || isNoInputPlayer2
  };


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

  useEffect(() => {
    const isNameInvalidLength = (name?.length as number) > 10;
    const isSameName = (player1.name as string).trim() === (player2.name as string).trim()
    if (isNameInvalidLength) {
      isPlayer1 ? setIsLongNamePlayer1(true) : setIsLongNamePlayer2(true);
      isPlayer1 ? setDidErrorOccurPlayer1(true) : setDidErrorOccurPlayer2(true);
    } else if (!name?.length) {
      isPlayer1 ? setIsNoInputPlayer1(true) : setIsNoInputPlayer2(true);
      isPlayer1 ? setDidErrorOccurPlayer1(true) : setDidErrorOccurPlayer2(true);
      debugger
    } else if (isSameName) {
      setIsSameName(true);
      isPlayer1 ? setDidErrorOccurPlayer1(true) : setDidErrorOccurPlayer2(true);
      debugger
    } else {
      isPlayer1 ? setIsNoInputPlayer1(false) : setIsNoInputPlayer2(false);
      isPlayer1 ? setIsLongNamePlayer1(false) : setIsLongNamePlayer2(false);
      isPlayer1 ? setDidErrorOccurPlayer1(false) : setDidErrorOccurPlayer2(false);
      setIsSameName(false);
    }
  }, [name, player1.name, player2.name]);


  return (
    <div className='playerInfo'>
      <section>
        <h3>{isPlayer1 ? "Player 1's name: " : "Player 2's name: "}</h3>
        <div className='inputNameContainer'>
          <input
            defaultValue={name as string}
            style={{ color: ((isPlayer1 ? didErrorOccurPlayer1 : didErrorOccurPlayer2) && (getPlayerErrorBooleans() || isSameName)) ? 'red' : 'white' }}
            onChange={event => { handleOnchange(event) }}
          />
          {<span>
            {((isPlayer1 ? didErrorOccurPlayer1 : didErrorOccurPlayer2) && (getPlayerErrorBooleans() || isSameName)) && getErrorTxt()}
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