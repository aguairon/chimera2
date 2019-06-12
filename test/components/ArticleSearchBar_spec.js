/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import ArticleSearchBar from '../../src/components/articles/ArticleSearchBar'

describe('ArticleSearchBar Login test when no data is provided', () => {
  let wrapper

  const onSubmit = sinon.stub()
  const onChange = sinon.stub()
  beforeEach(done => {
    wrapper = shallow(<ArticleSearchBar handleChange={onChange} handleSubmit={onSubmit}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('form .searchbar').length).to.eq(1)
    expect(wrapper.find('form .searchbar input').length).to.eq(1)
    done()
  })

  it('should render the correct placeholder', done => {
    expect(wrapper.find('form .searchbar input').prop('placeholder')).to.eq('Search')
    done()
  })

  it('responds to value change', done => {
    wrapper.find('form .searchbar input').simulate('change', { target: { value: 'Hello' }})
    expect(onChange.calledOnce).to.be.true

    // wrapper.simulate('keypress', {keyCode: 13})
    // expect(onSubmit.calledOnce).to.be.true
    done()
  })
})
