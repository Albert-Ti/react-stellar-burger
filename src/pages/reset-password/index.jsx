import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useForm } from '../../hooks/use-form'
import { fetchResetPassword } from '../../redux/actions/user-action'
import { userState } from '../../redux/slice/user-slice'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { resetPasswordStatus, errorStatus } = useSelector(userState)

  const { values, handleChanges } = useForm({
    password: '',
    token: ''
  })

  const handleResetPassword = e => {
    e.preventDefault()
    dispatch(fetchResetPassword(values))
    navigate('/', { replace: true })
  }

  if (!resetPasswordStatus) return <Navigate to='/forgot-password' replace />
  return (
    <section className='wrapper'>
      <form className='content-route' onSubmit={handleResetPassword}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          autoFocus
          value={values.password}
          type='password'
          name='password'
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

export default ResetPassword
