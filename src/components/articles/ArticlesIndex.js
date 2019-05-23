import React from 'react'
import axios from 'axios'
import ArticlePanel from '../articles/ArticlePanel'
import ArticleSearchBar from '../articles/ArticleSearchBar'

class ArticlesIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      articles: [],
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    axios.get('/api/articles')
      .then(res => this.setState({ articles: res.data }))
  }

  filterArticles() {
    return this.state.articles.filter(article => {
      return article.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1 || this.state.search === ''
    })
  }

  handleChange({target: {name, value}}){
    this.setState({...this.state, [name]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <section className="section search">
          <div className="container">
            <h1 className="title is-1">Articles</h1>
            <ArticleSearchBar
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              searchValue={this.searchValue}
            />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="tile is-ancestor">
              {this.filterArticles().map(article =>
                <ArticlePanel  key={article.id} {...article}/>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ArticlesIndex
