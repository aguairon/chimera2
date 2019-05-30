/* global describe, it, after, before, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import ArticleLike from '../../src/components/articles/ArticleLike'
import Auth from '../../src/lib/Auth'

describe('ArticleLike test with one likedBy that is not the current user', () => {
  let wrapper

  before(done => {
    sinon.stub(Auth, 'isCurrentUser').returns(false)
    done()
  })

  after(done => {
    Auth.isCurrentUser.restore()
    done()
  })

  beforeEach(done => {
    const props = {
      likedBy: [{id: 6, username: 'begona'}]
    }

    wrapper = shallow(<ArticleLike likedBy={props.likedBy}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.likes').length).to.eq(1)
    expect(wrapper.find('.likes .button').length).to.eq(1)
    expect(wrapper.find('.likes .button .fa-thumbs-up').length).to.eq(1)
    expect(wrapper.find('.likes p').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.likes p').text()).to.eq('This article has been liked once.')
    done()
  })
})

describe('ArticleLike test with one likedBy that is the current user', () => {
  let wrapper

  before(done => {
    sinon.stub(Auth, 'isCurrentUser').returns(true)
    done()
  })

  after(done => {
    Auth.isCurrentUser.restore()
    done()
  })

  beforeEach(done => {
    const props = {
      likedBy: [{id: 6, username: 'begona'}]
    }

    wrapper = shallow(<ArticleLike likedBy={props.likedBy}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.likes').length).to.eq(1)
    expect(wrapper.find('.likes .button').length).to.eq(1)
    expect(wrapper.find('.likes p').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.likes p').text()).to.eq('You have liked this. This article has been liked once.')
    done()
  })
})

describe('ArticleLike test with no likedBy ', () => {
  let wrapper

  before(done => {
    sinon.stub(Auth, 'isCurrentUser').returns(false)
    done()
  })

  after(done => {
    Auth.isCurrentUser.restore()
    done()
  })

  beforeEach(done => {
    const props = {
      likedBy: []
    }

    wrapper = shallow(<ArticleLike likedBy={props.likedBy}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.likes').length).to.eq(1)
    expect(wrapper.find('.likes .button').length).to.eq(1)
    expect(wrapper.find('.likes p').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.likes p').text()).to.eq('This article has not been liked yet.')
    done()
  })
})

describe('ArticleLike test with several likedBy ', () => {
  let wrapper

  before(done => {
    sinon.stub(Auth, 'isCurrentUser').returns(false)
    done()
  })

  after(done => {
    Auth.isCurrentUser.restore()
    done()
  })

  beforeEach(done => {
    const props = {
      likedBy: [{id: 6, username: 'begona'}, {id: 1, username: 'carmen'}]
    }

    wrapper = shallow(<ArticleLike likedBy={props.likedBy}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.likes').length).to.eq(1)
    expect(wrapper.find('.likes .button').length).to.eq(1)
    expect(wrapper.find('.likes p').length).to.eq(1)
    done()
  })

  it('should render the corect data', done => {
    expect(wrapper.find('.likes p').text()).to.eq('This article has been liked 2 times.')
    done()
  })
})
