import React from 'react'

const ModalButton = ({data, action}) => {
  let disabled
  if (action === 'Register') {
    const {password, username, email, password_confirmation: passwordConfirmation} = data
    if (!email || !username || !password || !passwordConfirmation) {
      disabled = true
    } else {
      disabled = false
    }
  } else {
    const {email, password} = data
    if (!email || !password ) {
      disabled = true
    } else {
      disabled = false
    }
  }
  return(
    <button disabled={disabled} className="button is-info">{action}</button>
  )
}

export default ModalButton
