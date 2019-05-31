import React from 'react'

const ModalButton = ({data, type}) => {
  let button
  if (type === 'Register') {
    const {password, username, email, password_confirmation: passwordConfirmation} = data
    if (!email || !username || !password || !passwordConfirmation) {
      button = <button disabled={true} className="button is-info">{type}</button>
    } else {
      button = <button disabled={false} className="button is-info">{type}</button>
    }
  } else {
    const {email, password} = data
    if (!email || !password ) {
      button = <button disabled={true} className="button is-info">{type}</button>
    } else {
      button = <button disabled={false} className="button is-info">{type}</button>
    }
  }
  return(
    button
  )
}

export default ModalButton
