import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useForm } from '../../hooks/use-form'
import { fetchLogin } from '../../redux/actions/user-action'
import { userState } from '../../redux/slice/user-slice'

const Login = () => {
  const dispatch = useDispatch()
  const { errorStatus } = useSelector(userState)

  const { values, handleChanges } = useForm({
    email: sessionStorage.getItem('email') || '',
    password: ''
  })

  const handleSubmitLogin = e => {
    e.preventDefault()
    dispatch(fetchLogin(values))
  }

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
    </section>
  )
}

export default Login
