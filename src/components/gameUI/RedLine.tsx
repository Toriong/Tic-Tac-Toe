import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import { FC } from 'react'
import '../../css/game/redLine.css'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { useState } from 'react'


const RedLine: FC = () => {
    const { winningListName } = useContext(GameContext);
    const [savedWinningListName, setWinningListName] = useState(undefined);
    // save the winningListName into the local storage 

    useLayoutEffect(() => {
        const winningListNameSaved = localStorage.getItem('winningListName');
        if (winningListName) {
            localStorage.setItem('winningListName', JSON.stringify(winningListName));
        } else if (winningListNameSaved) {
            const _winningListName = JSON.parse(winningListNameSaved as string);
            setWinningListName(_winningListName);
        }
    }, []);

    return <div className={`redLine ${savedWinningListName ?? winningListName}`} />
}

export default RedLine