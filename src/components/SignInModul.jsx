import * as React from 'react';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { FormLabel } from '@mui/material';
import {UserAuth} from '../contexts/AuthContext'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn=(event)=>{
    event.preventDefault();
    signIn(email,password)

  }
  return (
    

    <div>
      <Button onClick={handleOpen}>Sign In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={e=>handleSignIn(e)}>
            <div className='form'>
              <div className='form__group'>
                <FormLabel>Email</FormLabel>
                <Input onChange={(e)=> setEmail(e.target.value)} className='form__input' placeholder='Enter Email' type='email' />
              </div>
              
              <div className='form__group'>
                <FormLabel>Password</FormLabel>
                <Input onChange={(e)=> setPassword(e.target.value)} className='form__input' placeholder='Enter Password' type='password' />
                
              </div>
              <Button type='submit'>Sign In</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
