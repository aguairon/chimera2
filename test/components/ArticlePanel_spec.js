/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ArticlePanel from '../../src/components/articles/ArticlePanel'

describe('ArticlePanel test wirth h1', () => {
  let wrapper
  beforeEach(done => {
    const article = {
      id: 1,
      title: 'title',
      content: 'content'
    }

    const h1 = 'h1'
    wrapper = shallow(<ArticlePanel article={article} h1={h1}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.container').length).to.eq(1)
    expect(wrapper.find('.container .is-1').length).to.eq(1)
    expect(wrapper.find('.container .article').length).to.eq(1)
    expect(wrapper.find('Link').length).to.eq(1)
    expect(wrapper.find('.container .article .title').length).to.eq(1)
    expect(wrapper.find('.container .article .content').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.container .is-1').text()).to.eq('h1')
    expect(wrapper.find('.container .article .title').text()).to.eq('title')
    expect(wrapper.find('.container .article .content').text()).to.eq('content')
    expect(wrapper.find('Link').prop('to')).to.eq('/articles/1')
    done()
  })
})

describe('ArticlePanel test with no h1', () => {
  let wrapper
  beforeEach(done => {
    const article = {
      id: 1,
      title: 'title',
      content: 'content'
    }
    wrapper = shallow(<ArticlePanel article={article}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.container').length).to.eq(1)
    expect(wrapper.find('.container .is-1').length).to.eq(0)
    expect(wrapper.find('.container .article').length).to.eq(1)
    expect(wrapper.find('Link').length).to.eq(1)
    expect(wrapper.find('.container .article .title').length).to.eq(1)
    expect(wrapper.find('.container .article .content').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.container .article .title').text()).to.eq('title')
    expect(wrapper.find('.container .article .content').text()).to.eq('content')
    expect(wrapper.find('Link').prop('to')).to.eq('/articles/1')
    done()
  })

})
