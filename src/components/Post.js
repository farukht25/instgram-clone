import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import { Button } from '@mui/material';
import { UserAuth } from '../contexts/AuthContext'
import firebase from 'firebase'


function Post({ imageURL, postUser, caption, postId }) {
    const { user } = UserAuth();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });

        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault()
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            userName: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setComment('')


    }

    return (
        <div className='post'>
            <div className='post-header'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3 className='post__header__username'>{postUser}</h3>
            </div>
            <img className='post-image'
                src={imageURL}
                alt="instagram clone"
            ></img>
            <h4 className='post__caption'>
                <span className='post__caption__username'>{postUser}</span>
                <span className='post__caption__text'>{caption}</span></h4>
            <div className="post__comments">
                {comments.map((comment) => {

                    return <p>

                        <strong>{comment.userName}</strong> {comment.text}
                    </p>

                })}
            </div>
            {user &&
                <form className='post__commentBox'>
                    <input
                        className='post__input'
                        text='type'
                        placeholder='Comment..'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Button
                        className='post__button'
                        disabled={!comment}
                        type='submit'
                        onClick={postComment}
                    >Post</Button>
                </form>}
        </div>
    )
}

export default Post