import React from 'react'
import MessageShow from '../messages/MessageShow'

const MessageIndex = ({ messages, newMessage }) => {
  return (
    <div className="tile is-parent is-vertical">
      {newMessage && <MessageShow message={newMessage}/>}
      {messages.map(message =>
        <MessageShow key={message.id} message={message}/>
      )}
    </div>
  )
}

export default MessageIndex
