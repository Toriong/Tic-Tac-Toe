import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import '../../css/game/redLine.css'
import winningNumsLists from '../../data/winningNumsLists.json'
import { FC } from 'react'
import { RedLineProps } from '../../interfaces/interfaces'

// GOAL: have this line appear on the UI when the following conditions are met:
// when there is a winner
// and the game has ended

// BRAIN DUMP NOTES:
// determine what was the winning pattern

const RedLine: FC<RedLineProps> = ({ gridPosition }) => {
    const { winningListName } = useContext(GameContext);
    const isOnWinningSpot = !!winningNumsLists.find(({ nums, name }) => ((name === winningListName) && nums.includes(gridPosition)))
    if ((winningListName === 'winningNums1') && isOnWinningSpot) {
        var willShowLine = true
    } else {
        willShowLine = false;
    }

    return willShowLine ? <div className={`redLine ${winningListName}`} /> : null;
}

export default RedLine