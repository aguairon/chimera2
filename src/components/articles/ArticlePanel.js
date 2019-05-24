import React from 'react'
import { Link } from 'react-router-dom'

const ArticlePanel = ({ article, h1}) => {
  console.log(article)
  const {id, title, content} = article
  return(
    <div className="container">
      {h1 && <h1 className="title is-1">{h1}</h1>}
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <Link to={`/articles/${id}`}>
            <article className="tile article is-child notification is-danger">
              <p className="title">{title}</p>
              <div className="content">
                {content}
              </div>
            </article>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticlePanel
