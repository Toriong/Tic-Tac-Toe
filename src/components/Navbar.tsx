import React from 'react'
import { FC } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarProps } from '../interfaces/interfaces';
import { GameContext, SettingsContext } from '../provider/Providers';
import { useContext } from 'react';
import '../css/navbar.css'


const Navbar: FC<NavbarProps> = ({ isOnGame }) => {
  const { currentTurn } = useContext(GameContext);
  const { player1, player2 } = useContext(SettingsContext);
  const { isPlayerOne, isPlayerTwo, isBot } = currentTurn;
  const navbarSubContainerCss = isOnGame ? 'navbarSubContainer onGame' : 'navbarSubContainer';
  let currentPlayer = ''

  if (isPlayerOne) {
    currentPlayer = (player1?.name as string) ?? 'Player 1';
  } else if (isPlayerTwo) {
    currentPlayer = (player2?.name as string) ?? 'Player 2';
  } else if (isBot) {
    currentPlayer = 'Bot';
  };
  debugger

  return (
    <div className='unfixed-wrapper'>
      <div className='navbar'>
        <div className={navbarSubContainerCss}>
          {isOnGame ?
            <section className='gameSection'>
              <h1>
                Turn: {currentPlayer}
              </h1>
              <button>
                <GiHamburgerMenu />
              </button>
            </section>
            :
            <section className='nonGameSection'>
              <h1>
                Gabe's tic-tac-toe
              </h1>
            </section>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar