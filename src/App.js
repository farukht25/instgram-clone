import './App.css';
import Header from './components/Header';
import SignUpModul from './components/SignUpModul';
import Post from './components/Post';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {db} from './firebase'
import { AuthContextProvider ,UserAuth} from './contexts/AuthContext';




function App() {
  const [posts,setPosts] =useState([])
  // const { user } = UserAuth();

  useEffect(()=>{

    db.collection('posts').orderBy('timestamp', 
    'desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data(),

      })))
    })

    
  },[])

  
  return (
    <div className="App">
      <AuthContextProvider>
      <Header />
      <div className='container'>
        {posts.map(({id ,post}) => <Post key={id} postId={id} imageURL={post.imageURL} postUser={post.postUser} caption={post.caption} />)}
      </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
