import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useAuth } from '../../hooks/use-auth'
import { useForm } from '../../hooks/use-form'
import { catchError } from '../../redux/slice/user-slice'

const Register = () => {
  const dispatch = useDispatch()
  const { form, setForm } = useForm()
  const { registration, errorStatus } = useAuth()

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    dispatch(catchError(null))
  }, [])

  const handleRegistration = async e => {
    e.preventDefault()
    await registration(form)
  }

  return (
    <div className='wrapper'>
      <form className='content-route'>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          autoFocus
          type='text'
          name='name'
          placeholder='Имя'
          value={form.name}
          onChange={handleInput}
        />
        <Input
          type='email'
          name='email'
          placeholder='E-mail'
          value={form.email}
          onChange={handleInput}
        />
        <PasswordInput placeholder='Пароль' value={form.password} onChange={handleInput} />
        <Button htmlType='submit' onClick={handleRegistration}>
          Зарегистрироваться
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
        Уже зарегистрированы?{' '}
        <Link to='/login' className='route-link text_color_accent'>
          Войти
        </Link>
      </p>
    </div>
  )
}

export default Register
