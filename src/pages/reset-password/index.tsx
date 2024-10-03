import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input/password-input'
import {useAppDispatch, useForm} from '../../hooks'
import {fetchResetPassword} from '../../redux/user/actions'
import {catchError, userStore} from '../../redux/user/slice'
import {THandleSubmitForm} from '../../types'

const ResetPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {resetPasswordStatus, errorStatus} = useSelector(userStore)

  const {values, handleChanges} = useForm({
    password: '',
    token: '',
  })

  const handleResetPassword = (e: THandleSubmitForm) => {
    e.preventDefault()
    dispatch(fetchResetPassword(values))
    navigate('/', {replace: true})
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(catchError(null))
    }, 6000)
  }, [errorStatus, dispatch])

  if (!resetPasswordStatus) return <Navigate to='/forgot-password' replace />
  return (
    <section className='wrapper'>
      <form className='content-route' onSubmit={handleResetPassword}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          autoFocus
          value={values.password}
          placeholder='Введите новый пароль'
          onChange={handleChanges}
        />
        <Input
          value={values.token}
          type='text'
          name='token'
          placeholder='Введите код из письма'
          onChange={handleChanges}
        />
        <Button htmlType='submit'>Сохранить</Button>
        <span
          className={`text text_type_main-default ${errorStatus ? 'text-error-active' : 'text-error'}`}
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

export default ResetPassword
