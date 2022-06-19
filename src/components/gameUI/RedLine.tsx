import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import { FC } from 'react'
import '../../css/game/redLine.css'


const RedLine: FC = () => {
    const { winningListName } = useContext(GameContext);

    return <div className={`redLine ${winningListName}`} />
}

export default RedLine