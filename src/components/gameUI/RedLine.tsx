import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../../provider/Providers'
import { FC } from 'react'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { RedLineProps } from '../../interfaces/interfaces'
import '../../css/game/redLine.css'


const RedLine: FC<RedLineProps> = ({ isRedLine1 }) => {
    const { setRedLineClassName, redLineClassName, redLine2ClassName, setRedLine2ClassName } = useContext(GameContext);

    const getSavedRedLineCssClassNames = (): { redLine2ClassName: String | null, redLineClassName: String | null } => {
        const redLineClassName = localStorage.getItem('redLineClassName');
        const redLine2ClassName = localStorage.getItem('redLine2ClassName');

        return { redLine2ClassName, redLineClassName }
    }

    useLayoutEffect(() => {
        const { redLineClassName, redLine2ClassName } = getSavedRedLineCssClassNames();
        if (redLineClassName && isRedLine1) {
            const _redLineClassName = JSON.parse(redLineClassName as string);
            setRedLineClassName(_redLineClassName);
        } else if (redLine2ClassName && !isRedLine1) {
            const _redLine2ClassName = JSON.parse(redLine2ClassName as string);
            setRedLine2ClassName(_redLine2ClassName);
        }
    }, []);

    useEffect(() => {
        console.log('redLineClassName: ', redLineClassName)
    })

    return <div className={`redLine ${isRedLine1 ? redLineClassName : redLine2ClassName}`} />
}

export default RedLine