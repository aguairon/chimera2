import React from 'react'

const FormButton = ({data, action, type}) => {
  let disabled
  if (data.content === '' || data.title === '') {
    disabled = true
  } else {
    disabled = false
  }
  return(
    <button disabled={disabled} className={'button ' + type}>{action}</button>
  )
}

export default FormButton
