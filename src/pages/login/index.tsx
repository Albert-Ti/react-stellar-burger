import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input/password-input'
import {useAppDispatch, useForm} from '../../hooks'
import {fetchLogin} from '../../redux/user/actions'
import {catchError, userStore} from '../../redux/user/slice'
import {THandleSubmitForm} from '../../types'

const Login = () => {
  const dispatch = useAppDispatch()
  const {errorStatus} = useSelector(userStore)

  const {values, handleChanges} = useForm({
    email: sessionStorage.getItem('email') || '',
    password: '',
  })

  const handleSubmitLogin = (e: THandleSubmitForm) => {
    e.preventDefault()
    dispatch(fetchLogin(values))
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(catchError(null))
    }, 6000)
  }, [errorStatus, dispatch])

  return (
    <section className='wrapper'>
      <form className='content-route' onSubmit={handleSubmitLogin}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <Input
          autoFocus
          type='email'
          name='email'
          placeholder='E-mail'
          value={values.email}
          onChange={handleChanges}
        />
        <PasswordInput placeholder='Пароль' value={values.password} onChange={handleChanges} />
        <Button htmlType='submit'>Войти</Button>
        <span
          className={`text text_type_main-default ${errorStatus ? 'text-error-active' : 'text-error'}`}
        >
          {errorStatus?.message}
        </span>
      </form>

      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?{' '}
        <Link to='/register' className='route-link text_color_accent'>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?{' '}
        <Link to='/forgot-password' className='route-link text_color_accent'>
          Восстановить пароль
        </Link>
      </p>
    </section>
  )
}

export default Login
