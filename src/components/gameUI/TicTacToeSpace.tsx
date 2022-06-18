import React from 'react'
import { FC } from 'react'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'


// GOAL: have the follow show up in the comp: either x or o

// CASE1: 
// it is player 1's turn, pressing on the space 

// GOAL: 

const TicTacToeSpace:FC<TicTacToeSpaceProps> = ({gridPosition}) => {
  

  return (
      <td defaultValue={JSON.stringify(gridPosition)}>
          
      </td>
  )
}

export default TicTacToeSpace