import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

  return (
    <div>
      <Button onClick={handleOpen}>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className='form'>
              <div className='form__group'>
                <label>Email</label>
                <input className='form__input' placeholder='Enter Email' type='email' />
              </div>
              <div className='form__group'>
                <label>Username</label>
                <input className='form__input' placeholder='Enter User Name' type='text' />
              </div>
              <div className='form__group'>
                <label>Password</label>
                <input className='form__input' placeholder='Enter Password' type='password' />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
