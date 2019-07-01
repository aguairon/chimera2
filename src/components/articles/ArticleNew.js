import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import FormButton from '../common/FormButton'
import TextareaAutosize from 'react-textarea-autosize'

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
    this.setState({ data })
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
          <h1 className="title is-3">New article</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              autoComplete="off"
              className="title is-1 input hidden-input"
              placeholder="Title is required"
              autoFocus
              name="title"
              onChange={this.handleChange}
              value={data.title}
            />
            <article className="tile article is-child notification is-danger">
              <TextareaAutosize
                autoComplete="off"
                className="article is-1 input hidden-input"
                placeholder="Article content is required"
                name="content"
                onChange={this.handleChange}
                useCacheForDOMMeasurements
                value={data.content}
              />
            </article>
            {error && <div className="help is-danger">{error}</div>}
            <FormButton data={data} action={'Submit'} type={'is-primary'}/>
          </form>
        </div>
      </main>
    )
  }
}

export default ArticleNew
