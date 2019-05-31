import React from 'react'

const FormButton = ({data, action, type}) => {
  let disabled
  if (!data.content) {
    disabled = true
  } else {
    disabled = false
  }
  return(
    <button disabled={disabled} className={'button ' + type}>{action}{action}</button>
  )
}

export default FormButton
