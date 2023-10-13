import { HideIcon, Input, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { TPasswordInput } from './types'

const PasswordInput: React.FC<TPasswordInput> = ({ ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  return (
    <div className='input'>
      <Input {...props} name='password' type={isVisible ? 'text' : 'password'} />
      <span onClick={() => setIsVisible(!isVisible)} className='icon-input'>
        {isVisible ? <HideIcon type='primary' /> : <ShowIcon type='primary' />}
      </span>
    </div>
  )
}

export default PasswordInput
