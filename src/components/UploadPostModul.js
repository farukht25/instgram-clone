import * as React from 'react';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { Input,TextField  } from '@mui/material';
import { UserAuth } from '../contexts/AuthContext'
import firebase from 'firebase'
import { db, storage } from '../firebase'


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
    const { user } = UserAuth();
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    

    const handleUpload = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleShare = (e) =>{
        e.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes * 100)
                );
                setProgress(progress);
            },
            ((err) => {
                console.log(err);
                alert(err)
            }),
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL() 
                .then(url => {
                    console.log("user:"+user.displayName)
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageURL: url,
                        postUser: user.displayName
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                    handleClose()
                })
            }

        )
    }
  return (


    <div>
      <Button onClick={handleOpen}>Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleShare}>
          <div className='fileUpload'>
            
            <Input className='fileUpload__filepicker' id="filled-basic" label="File" variant="filled"  onChange={handleUpload} type='file' />
            <TextField id="filled-basic" label="Caption" variant="filled" onChange={e => setCaption(e.target.value)} type='text'  value={caption}/>
            {progress===0?null:<div className='fileUpload__progressbar'>
            <CircularProgress  variant="determinate" value={progress} />
            </div>}
            
            <Button type='submit'>Share</Button>
        </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
