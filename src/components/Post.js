import React from 'react'
import Avatar from '@mui/material/Avatar';

function Post({imageURL,postUser,caption}) {
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
        </div>
    )
}

export default Post