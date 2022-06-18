import React from 'react'
import { FC } from 'react'
import { TicTacToeSpaceProps } from '../../interfaces/interfaces'



const TicTacToeSpace:FC<TicTacToeSpaceProps> = ({gridPosition}) => {
  

  return (
      <td defaultValue={JSON.stringify(gridPosition)}>
          
      </td>
  )
}

export default TicTacToeSpace