import React, { FC } from 'react'
import ResetBtn from '../buttons/Reset';
import EndGame from '../buttons/EndGame';
import '../../css/modals/sideModal.css'


const SideModal: FC = () => (
    <div className='sideModal'>
        <div>
            <ResetBtn />
            <EndGame />
        </div>
    </div>
)


export default SideModal