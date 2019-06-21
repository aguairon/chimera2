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
      data: {
        content: ''
      }
    }

    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/articles/${this.props.match.params.id}`)
      .then(res => this.setState({ article: res.data }))
  }

  handleLike() {
    if(!this.state.article.liked_by.some(like => Auth.isCurrentUser(like.id))) {
      axios
        .put(`/api/articles/${this.props.match.params.id}/like`,
          {},
          { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({ article: res.data }))
        .catch(err => this.setState({error: err.response.status}))
    } else {
      axios
        .delete(`/api/articles/${this.props.match.params.id}/like`,
          { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({ article: res.data }))
        .catch(err => this.setState({error: err.response}))
    }
  }

  render() {
    if(!this.state.article) return null
    const  {title, content, messages, creator, created_at: createdAt, liked_by: likedBy} = this.state.article
    return(
      <section className="section">
        <div className="container">
          <h1 className='title is-1'>{title}</h1>
          <article className="tile article is-child notification is-danger">
            <div className="content">
              {content.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
            </div>
            <Link to={`/users/${creator.id}`} className='createdBy'> Written by {creator.username} on {createdAt}</Link>
          </article>
          <ArticleLike likedBy={likedBy} handleLike={this.handleLike} error={this.state.error}/>
          <MessageForm articleId={this.props.match.params.id}  />
          <MessagesIndex messages={messages}/>
        </div>
      </section>
    )
  }
}

export default ArticleShow
