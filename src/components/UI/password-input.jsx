import PropTypes from 'prop-types'
import { HideIcon, Input, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'

const PasswordInput = ({ ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  return (
    <div className='input'>
      <Input {...props} name='password' type={isVisible ? 'text' : 'password'} />
      <span onClick={() => setIsVisible(!isVisible)} className='icon-input'>
        {isVisible ? <HideIcon /> : <ShowIcon />}
      </span>
    </div>
  )
}

PasswordInput.propTypes = {
  props: PropTypes.object
}

export default PasswordInput
