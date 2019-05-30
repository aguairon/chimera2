import React from 'react'

const FormButton = ({content, type}) => {
  let button
  if (content) {
    button = <button className="button is-primary">{type}</button>
  } else {
    button = <button disabled className="button is-primary">{type}</button>
  }
  return(
    button
  )
}

export default FormButton
