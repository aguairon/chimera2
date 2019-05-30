import React from 'react'
import Auth from '../../lib/Auth'

const ArticleLike = ({ likedBy, handleLike, error }) => {
  const userLiked = 'You have liked this.'
  const likedMany = 'This article has been liked ' + likedBy.length + ' times.'
  const likedOnce = 'This article has been liked once.'

  let message
  if (error === 403) {
    message = <p>You cannot like your own article.</p>
  } else if (likedBy.length === 0){
    message = <p>This article has not been liked yet.</p>
  } else if (likedBy.length === 1) {
    if (likedBy.some(like => Auth.isCurrentUser(like.id))) {
      message = <p>{userLiked} {likedOnce}</p>
    } else {
      message = <p>{likedOnce}</p>
    }
  } else {
    if (likedBy.some(like => Auth.isCurrentUser(like.id))) {
      message = <p>{userLiked} {likedMany}</p>
    } else {
      message = <p>{likedMany}</p>
    }
  }
  return (
    <div className={likedBy.some(like =>
      Auth.isCurrentUser(like.id)) ? 'likes liked_by_user' : 'likes'}>
      <button className='button' onClick={handleLike}>
        <span className="icon is-big is-left" >
          <i className="fas fa-2x fa-thumbs-up"></i>
        </span>
      </button>
      {message}
    </div>
  )
}

export default ArticleLike
