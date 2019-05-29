import React from 'react'
import { Link } from 'react-router-dom'

const ArticlePanel = ({ article: {id, title, content}, h1}) => {
  return(
    <div className="container">
      {h1 && <h1 className="title is-1">{h1}</h1>}
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <Link to={`/articles/${id}`}>
            <article className="tile article is-child notification is-danger">
              <p className="title">{title}</p>
              <div className="content">
                {content.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
                })}
              </div>
            </article>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticlePanel
