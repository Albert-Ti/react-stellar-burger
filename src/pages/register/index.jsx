import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/UI/password-input'
import { useForm } from '../../hooks/use-form'
import { fetchRegister } from '../../redux/actions/user-action'

const Register = () => {
  const dispatch = useDispatch()
  const { values, handleChanges } = useForm({
    name: sessionStorage.getItem('name') || '',
    email: sessionStorage.getItem('email') || '',
    password: ''
  })

  const handleSubmitRegistration = e => {
    e.preventDefault()
    dispatch(fetchRegister(values))
  }

  return (
    <div className='wrapper'>
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
