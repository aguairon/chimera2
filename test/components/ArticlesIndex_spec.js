/* global describe, it, before, beforeEach, after */

import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import ArticlesIndex from '../../src/components/articles/ArticlesIndex'


describe('ArticlesIndex test', ()=> {
  let wrapper, response
  before(done => {
    response = Promise.resolve({
      data: [
        {
          content: 'blah',
          created: '2019-03-04 16:01:38',
          creator: {
            email: 'begona@gmail.com',
            id: 3,
            username: 'begona'
          },
          id: 2,
          liked_by: '',
          messages: '',
          title: 'Athos',
          updated_at: '2019-03-04 16:01:38'
        }
      ]
    })

    sinon.stub(axios, 'get').returns(response)
    done()
  })

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/articles']}>
        <Route path="/articles" component={ArticlesIndex} />
      </MemoryRouter>
    )
    done()
  })

  after(done => {
    axios.get.restore()
    done()
  })

  it('should create the correct state', done => {
    response.then(() => {
      wrapper.update()
      const indexState  = wrapper.find('ArticlesIndex').state()
      const article = indexState.articles[0]
      expect(indexState.articles.length).to.eq(1)
      expect(article.id).to.eq(2)
      expect(article.title).to.eq('Athos')
      expect(article.updated_at).to.eq('2019-03-04 16:01:38')
      expect(article.content).to.eq('blah')
      expect(article.created).to.eq('2019-03-04 16:01:38')
      expect(article.creator.email).to.eq('begona@gmail.com')
      expect(article.creator.id).to.eq(3)
      expect(article.creator.username).to.eq('begona')
      expect(article.liked_by).to.eq('')
      expect(article.messages).to.eq('')
      expect(indexState.search).to.eq('')
      expect(indexState.error).to.eq('')
      done()
    })
  })

  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('.section').length).to.eq(1)
      expect(wrapper.find('h1').length).to.eq(1)
      expect(wrapper.find('ArticleSearchBar').length).to.eq(1)
      expect(wrapper.find('ArticlePanel').length).to.eq(1)
      expect(wrapper.find('ArticlePanel').prop('article')).to.eq(wrapper.find('ArticlesIndex').state().articles[0])
      done()
    })
  })
})
