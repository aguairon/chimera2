/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import MessagesIndex from '../../src/components/messages/MessagesIndex'

describe('MessageIndex test with two existing messages', () => {
  let wrapper
  beforeEach(done => {
    const messages= [{
      content: 'This is a very nice article, Thanks for posting',
      created_at: '2019-05-22 13:52:15',
      id: 1,
      sender: {
        id: 6,
        username: 'begona'
      },
      updated_at: '2019-05-22 13:52:15'
    },
    {
      content: 'This is a very nice article, Thanks for posting',
      created_at: '2019-05-22 13:52:15',
      id: 1,
      sender: {
        id: 6,
        username: 'begona'
      },
      updated_at: '2019-05-22 13:52:15'
    }]

    wrapper = shallow(<MessagesIndex messages={messages}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.is-parent').length).to.eq(1)
    expect(wrapper.find('.is-parent').children().length).to.eq(2)
    done()
  })
})

describe('MessageIndex test with one new messages', () => {
  let wrapper
  beforeEach(done => {
    const messages= []
    const newMessage = [{
      content: 'This is a very nice article, Thanks for posting',
      created_at: '2019-05-22 13:52:15',
      id: 1,
      sender: {
        id: 6,
        username: 'begona'
      },
      updated_at: '2019-05-22 13:52:15'
    }]

    wrapper = shallow(<MessagesIndex messages={messages} newMessage = {newMessage}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.is-parent').length).to.eq(1)
    expect(wrapper.find('.is-parent').children().length).to.eq(1)
    done()
  })
})

describe('MessageIndex test with one new messages', () => {
  let wrapper
  beforeEach(done => {
    const messages= [{
      content: 'This is a very nice article, Thanks for posting',
      created_at: '2019-05-22 13:52:15',
      id: 1,
      sender: {
        id: 6,
        username: 'begona'
      },
      updated_at: '2019-05-22 13:52:15'
    }]
    const newMessage = [{
      content: 'This is a very nice article, Thanks for posting',
      created_at: '2019-05-22 13:52:15',
      id: 1,
      sender: {
        id: 6,
        username: 'begona'
      },
      updated_at: '2019-05-22 13:52:15'
    }]

    wrapper = shallow(<MessagesIndex messages={messages} newMessage = {newMessage}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('.is-parent').length).to.eq(1)
    expect(wrapper.find('.is-parent').children().length).to.eq(2)
    done()
  })
})
