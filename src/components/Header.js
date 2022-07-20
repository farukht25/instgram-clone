import React from 'react'
import SignUpModul from '../components/SignUpModul'
import SignInModul from '../components/SignInModul'
import Button from '@mui/material/Button';
import {UserAuth} from '../contexts/AuthContext'
import { SignpostOutlined } from '@mui/icons-material';
import UploadPostModul from '../components/UploadPostModul';


function Header() {
  const { user ,logout} = UserAuth();
  

  const handleLogout = async () => {
    try {
      await logout();
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className='header'>
        <img className='header__logo' src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt="instagram clone" width="100" height="100"></img>

        {user?(<div className='header__button_group'><Button onClick={handleLogout}>Log Out</Button> <UploadPostModul/> </div>):
        (<div className='header__button_group'>
          <SignUpModul/>
        <SignInModul/>
        </div>)}
        
    </div>
  )
}

export default Header