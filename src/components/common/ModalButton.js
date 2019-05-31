import React from 'react'

const ModalButton = ({data, action, type}) => {
  let disabled
  if (action === 'Register') {
    const {password, username, email, password_confirmation: passwordConfirmation} = data
    if (!email || !username || !password || !passwordConfirmation) {
      disabled = true
    } else {
      disabled = false
    }
  } else if (action === 'Log In') {
    const {email, password} = data
    if (!email || !password ) {
      disabled = true
    } else {
      disabled = false
    }
  } else {
    if (data.content === '' || data.title === '') {
      disabled = true
    } else {
      disabled = false
    }
  }
  return(
    <button disabled={disabled} className={'button ' + type}>{action}</button>
  )
}

export default ModalButton
