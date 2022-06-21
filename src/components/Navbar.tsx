import React from 'react'
import { FC } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GameContext, ModalContext, SettingsContext } from '../provider/Providers';
import { useContext } from 'react';
import { BsCircle } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { AiFillCloseCircle } from "react-icons/ai";
import SideModal from './modal/SideModal';
import '../css/navbar.css'


const Navbar: FC = () => {
  const { currentTurn, isGameDone, isStaleMate, isOnGameSec } = useContext(GameContext);
  const { player1, player2, bot } = useContext(SettingsContext);
  const { setIsSideModalOn, isSideModalOn } = useContext(ModalContext)
  const { isPlayerOne, isPlayerTwo, isBot } = currentTurn;
  const navbarSubContainerCss = isOnGameSec ? 'navbarSubContainer onGame' : 'navbarSubContainer';
  let currentPlayer;

  const toggleModal = () => { setIsSideModalOn((isSideModalOn: Boolean) => !isSideModalOn); };

  if (isPlayerOne) {
    currentPlayer = player1;
  } else if (isPlayerTwo) {
    currentPlayer = player2;
  } else if (isBot) {
    currentPlayer = { isBot: true };
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
          {isOnGameSec ?
            <section className='gameSection'>
              <div>
                <h1>
                  {(gameInfoTxt === 'STALEMATE') ? 'STALEMATE' : `${gameInfoTxt}: ${currentPlayer?.isBot ? 'Bot' : currentPlayer?.name}`}
                </h1>
                {!(gameInfoTxt === 'STALEMATE') &&
                  (currentPlayer?.isXChosen ?
                    <MdOutlineClose id='XShape' />
                    :
                    <BsCircle id='OShape' />)
                }
              </div>
              <button onClick={toggleModal}>
                {isSideModalOn ? <AiFillCloseCircle /> : <GiHamburgerMenu />}
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
        <div className='modalContainer'>
          {isSideModalOn && <SideModal />}
        </div>
      </div>
    </div>
  )
}

export default Navbar