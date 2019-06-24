import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import MessagesIndex from '../../components/messages/MessagesIndex'
import MessageForm from '../../components/messages/MessageForm'
import ArticleLike from '../articles/ArticleLike'


class ArticleShow extends React.Component {
  constructor() {
    super()

    this.state = {
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/articles/${this.props.match.params.id}`)
      .then(res => this.setState({ article: res.data}))
  }

  handleChange({ target: { name, value }}) {
    const article = {...this.state.article, [name]: value }
    this.setState({ article })
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
    if(!this.state.article) return null
    const  { title, content, messages, creator, created_at: createdAt} = this.state.article
    return(
      <section className="section">
        <div className="container">
          <input
            autoComplete="off"
            className="title is-1 input hidden-input"
            placeholder="Name is required"
            name="title"
            onChange={this.handleChange}
            value={title}
            readOnly={!Auth.isCurrentUser(creator.id)}
          />


          <article className="tile article is-child notification is-danger">
            <div className="content">
              {content.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
            </div>
            <Link to={`/users/${creator.id}`} className='createdBy'> Written by {creator.username} on {createdAt}</Link>
          </article>
          <ArticleLike
            article= {this.state.article}
            id= {this.props.match.params.id}/>
          <MessageForm articleId={this.props.match.params.id}  />
          <MessagesIndex messages={messages}/>
        </div>
      </section>
    )
  }
}

export default ArticleShow
