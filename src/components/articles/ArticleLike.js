import React from 'react'
import Auth from '../../lib/Auth'
import axios from 'axios'

class ArticleLike extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {

      }
    }

    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    this.setState({ article: this.props.article})
  }

  handleLike() {
    if(!this.state.article.liked_by.some(like => Auth.isCurrentUser(like.id))) {
      axios
        .put(`/api/articles/${this.props.id}/like`,
          {},
          { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({ article: res.data }))
        .catch(err => this.setState({error: err.response.status}))
    } else {
      axios
        .delete(`/api/articles/${this.props.id}/like`,
          { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({ article: res.data }))
        .catch(err => this.setState({error: err.response}))
    }
  }

  render() {
    if (!this.state.article) {
      return <p>Loading</p>
    }
    const { article: {liked_by: likedBy} } = this.state
    const userLiked = 'You have liked this.'
    const likedMany = 'This article has been liked ' + likedBy.length + ' times.'
    const likedOnce = 'This article has been liked once.'

    let message
    if (this.state.error === 403) {
      message = <p>You cannot like your own article.</p>
    } else if (likedBy.length === 0){
      message = <p>This article has not been liked yet.</p>
    } else if (likedBy.length === 1) {
      if (likedBy.some(like => Auth.isCurrentUser(like.id))) {
        message = <p>{userLiked} {likedOnce}</p>
      } else {
        message = <p>{likedOnce}</p>
      }
    } else {
      if (likedBy.some(like => Auth.isCurrentUser(like.id))) {
        message = <p>{userLiked} {likedMany}</p>
      } else {
        message = <p>{likedMany}</p>
      }
    }
    return (
      <div className={likedBy.some(like =>
        Auth.isCurrentUser(like.id)) ? 'likes liked_by_user' : 'likes'}>
        <button className='button' onClick={this.handleLike}>
          <span className="icon is-big is-left" >
            <i className="fas fa-2x fa-thumbs-up"></i>
          </span>
        </button>
        {message}
      </div>
    )
  }
}

export default ArticleLike
