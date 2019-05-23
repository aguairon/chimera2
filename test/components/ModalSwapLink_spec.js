/* global describe, it, beforeEach */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import ModalSwapLink from '../../src/components/auth/ModalSwapLink'

describe('ModalSwapLink test', () => {
  let wrapper
  beforeEach(done => {
    wrapper = shallow(<ModalSwapLink message={'ta'}/>)
    done()
  })

  it('should render the correct HTML', done => {
    expect(wrapper.find('a').length).to.eq(1)
    expect(wrapper.find('a').text()).to.eq('ta')
    expect(wrapper.find('a').hasClass('swap_form')).to.eq(true)

    const alert = sinon.spy()
    wrapper.simulate('click')
    expect(alert.callCount).to.equal(0)
    done()
  })
})
