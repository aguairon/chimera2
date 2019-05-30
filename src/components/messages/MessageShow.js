import React from 'react'

const MessageShow = ({message: {content, sender, updated_at: updated}}) => {
  return(
    <article
      className="tile message is-child notification is-danger">
      <div className="content">
        <p>{content}</p>
        <p>{sender.username} <span>{updated}</span></p>
      </div>
    </article>
  )
}

export default MessageShow
