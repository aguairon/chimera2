import React from 'react'
import FormButton from '../common/FormButton'

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
        <FormButton data={data.content} action={'Submit'} type={'is-primary'}/>
      </form>
    </div>
  )
}

export default MessageForm
