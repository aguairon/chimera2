import React from 'react'

const ModalSwapLink = ({handleToggle, message}) => {
  return(
    <a
      className="swap_form"
      onClick={handleToggle}
    >
      {message}
    </a>
  )
}

export default ModalSwapLink
