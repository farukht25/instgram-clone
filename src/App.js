import './App.css';
import Header from './components/Header';
import SignUpModul from './components/SignUpModul';
import Post from './components/Post';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {db} from './firebase'


function App() {
  const [posts,setPosts] =useState([])

  useEffect(()=>{

    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data(),

      })))
    })

    
  },[])

  
  return (
    <div className="App">
      <Header />
     
      <div className='container'>
        {posts.map(({id ,post}) => <Post key={id} imageURL={post.imageURL} postUser={post.postUser} caption={post.caption} />)}
      </div>
    </div>
  );
}

export default App;
