import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useAuth } from '../../hooks/use-auth'
import { useForm } from '../../hooks/use-form'
import { catchError } from '../../redux/slice/user-slice'
import { resetPasswordRequest } from '../../utils/api'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { form, setForm } = useForm()
  const { errorStatus } = useAuth()

  const handleResetPassword = async e => {
    e.preventDefault()
    await resetPasswordRequest({ password: form.password, token: form.codeEmail })
      .then(data => {
        if (data?.success) navigate('/ingredients')
      })
      .catch(err => dispatch(catchError(err)))
  }

  return (
    <div className='wrapper'>
      <form className='content-route'>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          autoFocus
          value={form.password}
          type='password'
          name='password'
          placeholder='Введите новый пароль'
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <Input
          value={form.codeEmail}
          type='text'
          name='code'
          placeholder='Введите код из письма'
          onChange={e => setForm({ ...form, codeEmail: e.target.value })}
        />
        <Button onClick={handleResetPassword} htmlType='submit'>
          Сохранить
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

export default ResetPassword
