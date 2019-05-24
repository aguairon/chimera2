import React from 'react'
import axios from 'axios'
import ArticlePanel from './articles/ArticlePanel'
import { Link } from 'react-router-dom'
import Promise from 'bluebird'

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {

    Promise.props({
      latest: axios.get('/api/articles/latest').then(res => res.data),
      user: axios.get('/api/users/most-prolific').then(res => res.data),
      likedArticle: axios.get('/api/articles/most-liked').then(res => res.data)
    })
      .then(data => this.setState(data))
  }

  render() {
    if(!this.state.latest || !this.state.user || !this.state.likedArticle) return null
    const {id, username, email, created_articles: createdArticles } = this.state.user
    return(
      <main>
        <section className="section">
          <ArticlePanel  article= {this.state.latest[0]} h1={'Latest article'}/>
        </section>
        <section className="section">
          <ArticlePanel  article={this.state.likedArticle} h1={'Most liked article'}/>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title is-1">User with most articles</h1>
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <Link to={`/users/${id}`}>
                  <article className="tile article is-child notification is-danger">
                    <p className="title">{username}</p>
                    <p>{email}</p>
                    <div className="content">
                      This user has written {createdArticles.length}
                    </div>
                  </article>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Homepage
