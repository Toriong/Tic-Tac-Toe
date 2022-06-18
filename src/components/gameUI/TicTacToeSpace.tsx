import React from 'react'
import { FC } from 'react'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'


// BRAIN DUMP NOTES:
// the user clicks on the spot 
// when the user clicks on a spot, get the following info on the user who click on the spot:
// who the user is 
// what shape is the user 
// and the position that the user clicked on 
// when the user clicks on the spot, get the position (gridPosition)
// find out who the currentPlayer is
// store the number of the position selected into the field of positionSelected of the target user
// the comp will re-render
// get the gridPosition
// get all of the users 
// get the type of game that is being played 
// for all of the users, get the field of spotsChosen
// 

const TicTacToeSpace: FC<TicTacToeSpaceProps> = ({ gridPosition }) => {
  // GOAL: when the user clicks on the spot, present 

  return (
    <td defaultValue={JSON.stringify(gridPosition)}>

    </td>
  )
}

export default TicTacToeSpace