import React from 'react'
import ArticlePanel from '../articles/ArticlePanel'

const PopulatedProfileSection = ({items}) => {
  return (
    <section className="section">
      {items.map(item => <div key={item.id} className="tile">
        <ArticlePanel article= {item}/>
      </div>)}
    </section>
  )
}

export default PopulatedProfileSection
