import React from 'react'
import { FC } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarProps } from '../interfaces/interfaces';
import { GameContext, SettingsContext } from '../provider/Providers';
import { useContext } from 'react';
import { BsCircle } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import '../css/navbar.css'


const Navbar: FC<NavbarProps> = ({ isOnGame }) => {
  const { currentTurn, isGameDone, isStaleMate } = useContext(GameContext);
  const { player1, player2, bot } = useContext(SettingsContext);
  const { isPlayerOne, isPlayerTwo, isBot } = currentTurn;
  const navbarSubContainerCss = isOnGame ? 'navbarSubContainer onGame' : 'navbarSubContainer';
  let currentPlayer;

  if (isPlayerOne) {
    currentPlayer = player1;
  } else if (isPlayerTwo) {
    currentPlayer = player2;
  } else if (isBot) {
    currentPlayer = bot;
  };

  if (isStaleMate) {
    var gameInfoTxt = 'STALEMATE'
  } else if (isGameDone) {
    gameInfoTxt = 'WINNER'
  } else {
    gameInfoTxt = 'Turn'
  }


  return (
    <div className='unfixed-wrapper'>
      <div className='navbar'>
        <div className={navbarSubContainerCss}>
          {isOnGame ?
            <section className='gameSection'>
              <div>
                <h1>
                  {gameInfoTxt}: {currentPlayer?.isBot ? 'Bot' : currentPlayer?.name}
                </h1>
                {currentPlayer?.isXChosen ?
                  <MdOutlineClose id='XShape' />
                  :
                  <BsCircle id='OShape' />
                }
              </div>
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