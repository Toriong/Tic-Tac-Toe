import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import '../css/navbar.css'


const Navbar = () => {
    return (
      <div className='unfixed-wrapper'>
      <div className='navbar'>
          <div className='navbarSubContainer'>
                <section>
                    <h1>Gabe's tic-tac-toe</h1>        
                    </section>
                    <section>
                        <GiHamburgerMenu/>
                    </section>
          </div>
    </div>
      </div>
  )
}

export default Navbar