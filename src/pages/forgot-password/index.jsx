import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from '../../hooks/use-form'
import { fetchForgotPassword } from '../../redux/user/user-actions'
import { catchError, userStore } from '../../redux/user/user-slice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { resetPasswordStatus, errorStatus } = useSelector(userStore)

  const { values, handleChanges } = useForm({
    email: sessionStorage.getItem('email') || ''
  })

  console.log(resetPasswordStatus)
  const handleSubmitForgotPassword = e => {
    e.preventDefault()
    dispatch(fetchForgotPassword(values))
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(catchError(null))
    }, 6000)
  }, [errorStatus, dispatch])

  if (resetPasswordStatus) return <Navigate to='/reset-password' replace />
  return (
    <section className='wrapper'>
      <form className='content-route' onSubmit={handleSubmitForgotPassword}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <Input
          autoFocus
          value={values.email}
          type='email'
          name='email'
          placeholder='Укажите E-mail'
          onChange={handleChanges}
        />
        <Button disabled={!values.email} htmlType='submit'>
          Восстановить
        </Button>
        <span
          className={`text text_type_main-default ${
            errorStatus ? 'text-error-active' : 'text-error'
          }`}
        >
          {errorStatus?.message}
        </span>
      </form>

      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?{' '}
        <Link to='/login' className='route-link text_color_accent'>
          Войти
        </Link>
      </p>
    </section>
  )
}

export default ForgotPassword
