import React from 'react'
import ModalButton from '../common/ModalButton'

const MessageForm = ({ data, handleChange, handleSubmit}) => {
  return (
    <div className="tile is-parent is-vertical">
      <form className="messageForm" onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Add a message here"
              name="content"
              onChange={handleChange}
              value={data.content || ''}>
            </textarea>
          </div>
        </div>
        <ModalButton data={data} action={'Submit'} type={'is-primary'}/>
      </form>
    </div>
  )
}

export default MessageForm
