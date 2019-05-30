import React from 'react'
import FormButton from '../common/FormButton'

const MessageForm = ({ data, handleChange, handleSubmit}) => {
  return (
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
      <FormButton message={'Submit'}/>
    </form>
  )
}

export default MessageForm
