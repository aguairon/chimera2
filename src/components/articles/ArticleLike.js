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
    const userLiked =
      likedBy.some(like => Auth.isCurrentUser(like.id)) ?
        'You have liked this. ' :
        ''
    const times = likedBy.length === 1 ? 'once.' : likedBy.length + ' times.'
    const liked = likedBy.length === 0 ?
      'This article has not been liked yet.' :
      userLiked + 'This article has been liked ' + times
    const error = this.state.error === 403 ? 'You cannot like your own article. ' : ''


    return (
      <div className={likedBy.some(like =>
        Auth.isCurrentUser(like.id)) ? 'likes liked_by_user' : 'likes'}>
        <button className='button' onClick={this.handleLike}>
          <span className="icon is-big is-left" >
            <i className="fas fa-2x fa-thumbs-up"></i>
          </span>
        </button>
        <p>{error}{liked}</p>
      </div>
    )
  }
}

export default ArticleLike
