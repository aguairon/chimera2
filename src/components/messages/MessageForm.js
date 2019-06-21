import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import FormButton from '../common/FormButton'
import MessageShow from '../messages/MessageShow'

class MessageForm extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        content: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`/api/articles/${this.props.articleId}/messages`,
        this.state.data,
        { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({newMessage: res.data, data: {}}))
      .catch(err => this.setState({error: err.response.status}))
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ data, errors })
  }

  render() {
    const { data, newMessage } = this.state
    return (
      <div className="tile is-parent is-vertical">
        <form className="messageForm" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Add a message here"
                name="content"
                onChange={this.handleChange}
                value={data.content || ''}>
              </textarea>
            </div>
          </div>
          <FormButton data={data} action={'Submit'} type={'is-primary'}/>
        </form>
        {newMessage && <MessageShow message={newMessage}/>}
      </div>
    )
  }
}

export default MessageForm
