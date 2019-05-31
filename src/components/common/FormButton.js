import React from 'react'

const FormButton = ({data, action, type}) => {
  const disabled = (data.email === ''||
      data.username  === ''||
      data.password === ''||
      data.password_confirmation === '' ||
      data.content === '' ||
      data.title === '')

  return(
    <button disabled={disabled} className={'button ' + type}>{action}</button>
  )
}

export default FormButton
