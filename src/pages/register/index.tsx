import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input/password-input'
import {useAppDispatch, useForm} from '../../hooks'
import {fetchRegister} from '../../redux/user/actions'
import {catchError, userStore} from '../../redux/user/slice'
import {THandleSubmitForm} from '../../types'

const Register = () => {
  const dispatch = useAppDispatch()
  const {errorStatus} = useSelector(userStore)

  const {values, handleChanges} = useForm({
    name: sessionStorage.getItem('name') || '',
    email: sessionStorage.getItem('email') || '',
    password: '',
  })

  const handleSubmitRegistration = (e: THandleSubmitForm) => {
    e.preventDefault()
    dispatch(fetchRegister(values))
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(catchError(null))
    }, 6000)
  }, [errorStatus, dispatch])

  return (
    <section className='wrapper'>
      <form className='content-route' onSubmit={handleSubmitRegistration}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          autoFocus
          type='text'
          name='name'
          placeholder='Имя'
          value={values.name}
          onChange={handleChanges}
        />
        <Input
          type='email'
          name='email'
          placeholder='E-mail'
          value={values.email}
          onChange={handleChanges}
        />
        <PasswordInput placeholder='Пароль' value={values.password} onChange={handleChanges} />
        <Button htmlType='submit'>Зарегистрироваться</Button>
        <span
          className={`text text_type_main-default ${errorStatus ? 'text-error-active' : 'text-error'}`}
        >
          {errorStatus?.message}
        </span>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Уже зарегистрированы?{' '}
        <Link to='/login' className='route-link text_color_accent'>
          Войти
        </Link>
      </p>
    </section>
  )
}

export default Register
