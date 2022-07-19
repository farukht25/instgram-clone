import React from 'react'
import SignUpModul from '../components/SignUpModul'

function Header() {
  return (
    <div className='header'>
        <img className='header__logo' src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt="instagram clone" width="100" height="100"></img>
        <SignUpModul/>
    </div>
  )
}

export default Header