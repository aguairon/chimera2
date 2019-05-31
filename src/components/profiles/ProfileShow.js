import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import ProfileLikes from './ProfileLikes'
import ProfileDetails from './ProfileDetails'
import ProfileCreatedArticles from './ProfileCreatedArticles'
import { Link } from 'react-router-dom'

class ProfileShow extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: true,
      likes: false,
      details: false,
      active: ''
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  getUserData() {
    if (this.props.match.path === '/me') {
      axios
        .get('/api/me', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({data: res.data}))
        .catch(err => console.log(err))
    } else {
      axios
        .get(`/api/users/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(res => this.setState({data: res.data}))
        .catch(err => console.log(err))

    }
  }

  componentDidMount() {
    this.getUserData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getUserData()
    }
  }

  handleToggle(e) {
    if (e.target.id === 'articles') {
      this.setState({articles: true, likes: false, details: false})
    } else if (e.target.id === 'likes'){
      this.setState({articles: false, likes: true, details: false})
    } else {
      this.setState({articles: false, likes: false, details: true})
    }
  }

  render() {
    if(!this.state.data) return <h1>Loading...</h1>
    const  {articles, likes, details,
      data: {created_articles: createdArticles, email, created_at: createdAt, username, likes: dlikes}} = this.state

    const selected = 'is-primary is-selected'
    const currentUser = this.props.match.path === '/me'


    return(
      <section className="section profile">
        <div className="container username">
          <h1 className="title is-1">{username}</h1>
          {currentUser &&
          <Link to="/articles/new" className="createArticle button">Create New Article</Link>}
        </div>
        <div className="container profile_button">
          <a onClick={this.handleToggle}
            id="articles"
            className={'button is-rounded ' + (articles ? selected : '')}>
            {currentUser ? 'Articles you wrote' : 'Articles user wrote'}
          </a>
          <a onClick={this.handleToggle}
            id="likes"
            className={'button is-rounded ' + (likes ? selected : '')}>
            {currentUser ? 'Articles you liked' : 'Articles user liked'}
          </a>
          <a onClick={this.handleToggle}
            id="details"
            className={'button is-rounded ' + (details ? selected : '')}>
            {currentUser ? 'Your details' : 'User details'}
          </a>
        </div>
        {articles &&
          <ProfileCreatedArticles createdArticles={createdArticles}/>
        }
        {likes &&
          <ProfileLikes liked={dlikes}/>
        }
        {details &&
          <ProfileDetails email={email} createdAt={createdAt}/>
        }
      </section>
    )
  }
}

export default ProfileShow
