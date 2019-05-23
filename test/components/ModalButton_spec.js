/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ModalButton from '../../src/components/auth/ModalButton'

describe('ModalButton Login test when no data is provided', () => {
  let wrapper
  beforeEach(done => {
    const data= {
    }
    const type = 'Log In'
    wrapper = shallow(<ModalButton data={data} type={type}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('button').length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Log In')
    expect(wrapper.find('button').is('[disabled]')).to.eq(true)
    expect(wrapper.find('button').hasClass('is-info')).to.eq(true)
    done()
  })
})

describe('ModalButton Login test with all required data', () => {
  let wrapper
  beforeEach(done => {
    const data= {
      email: 'carmen@gmail.com',
      password: 'passpass'
    }
    const type = 'Log In'
    wrapper = shallow(<ModalButton data={data} type={type}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('button').length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Log In')
    expect(wrapper.find('button').is('[disabled]')).to.eq(false)
    expect(wrapper.find('button').hasClass('is-info')).to.eq(true)
    done()
  })
})

describe('ModalButton Login test some required data missing', () => {
  let wrapper
  beforeEach(done => {
    const data= {
      email: 'carmen@gmail.com',
      password: ''
    }
    const type = 'Log In'
    wrapper = shallow(<ModalButton data={data} type={type}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('button').length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Log In')
    expect(wrapper.find('button').is('[disabled]')).to.eq(true)
    expect(wrapper.find('button').hasClass('is-info')).to.eq(true)
    done()
  })
})


describe('ModalButton register test some required data missing', () => {
  let wrapper
  beforeEach(done => {
    const data= {
      email: 'carmen@gmail.com',
      username: 'carmen',
      password: '',
      password_confirmation: ''
    }
    const type = 'Register'
    wrapper = shallow(<ModalButton data={data} type={type}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('button').length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Register')
    expect(wrapper.find('button').is('[disabled]')).to.eq(true)
    expect(wrapper.find('button').hasClass('is-info')).to.eq(true)
    done()
  })
})

describe('ModalButton register test with all required data', () => {
  let wrapper
  beforeEach(done => {
    const data= {
      email: 'carmen2@gmail.com',
      username: 'carmen',
      password: 'passpass',
      password_confirmation: 'passpasss'
    }
    const type = 'Register'
    wrapper = shallow(<ModalButton data={data} type={type}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('button').length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Register')
    expect(wrapper.find('button').is('[disabled]')).to.eq(false)
    expect(wrapper.find('button').hasClass('is-info')).to.eq(true)
    done()
  })
})
