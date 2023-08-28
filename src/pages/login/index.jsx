import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useAuth } from '../../hooks/use-auth'
import { useForm } from '../../hooks/use-form'
import { catchError } from '../../redux/slice/user-slice'

const Login = () => {
  const dispatch = useDispatch()
  const { form, setForm } = useForm()
  const { sigIn, errorStatus } = useAuth()

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    dispatch(catchError(null))
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    sigIn(form)
  }

  return (
    <div className='wrapper'>
      <form className='content-route'>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <Input
          autoFocus
          type='email'
          name='email'
          placeholder='E-mail'
          value={form.email}
          onChange={handleInput}
        />
        <PasswordInput placeholder='Пароль' value={form.password} onChange={handleInput} />
        <Button onClick={handleLogin} htmlType='submit'>
          Войти
        </Button>

        <span
          className={`text text_type_main-default ${
            errorStatus ? 'text-error-active' : 'text-error'
          }`}
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
    </div>
  )
}

export default Login
