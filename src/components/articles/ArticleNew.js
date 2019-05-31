import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import ModalButton from '../common/ModalButton'

class ArticleNew extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        title: '',
        content: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios
      .post('/api/articles',
        this.state.data,
        { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.props.history.push(`/articles/${res.data.id}`))
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    const {data,  error} = this.state
    return(
      <main className="section">
        <div className="container">
          <h1 className="title is-1">New article</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  placeholder="Article title"
                  onChange={this.handleChange}
                  name="title"
                  value={data.title|| ''}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Please write your article here"
                  onChange={this.handleChange}
                  name="content"
                  value={data.content || ''}
                />
              </div>
            </div>

            {error && <small className="help is-danger">{error}</small>}
            <ModalButton data={data} action={'Submit'} type={'is-primary'}/>
          </form>
        </div>
      </main>
    )
  }
}

export default ArticleNew
