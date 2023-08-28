import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/use-form'
import { forgotPasswordRequest } from '../../utils/api'
import { useDispatch } from 'react-redux'
import { catchError } from '../../redux/slice/user-slice'
import { useAuth } from '../../hooks/use-auth'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { form, setForm } = useForm()
  const { errorStatus } = useAuth()

  const handleForgotPassword = async e => {
    e.preventDefault()
    await forgotPasswordRequest({ email: form.email })
      .then(data => {
        if (data?.success) navigate('/reset-password')
      })
      .catch(err => dispatch(catchError(err)))
  }

  return (
    <div className='wrapper'>
      <form className='content-route'>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <Input
          autoFocus
          value={form.email}
          type='email'
          name='email'
          placeholder='Укажите E-mail'
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <Button onClick={handleForgotPassword} htmlType='submit'>
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
    </div>
  )
}

export default ForgotPassword
