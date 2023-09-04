import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/use-form'
import { fetchEditUser } from '../../redux/actions/user-action'
import { userState } from '../../redux/slice/user-slice'
import styles from './profile-user.module.css'

const ProfileUser = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(userState)

  const { values, setValues } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: user.password || ''
  })

  const [editValues, setEditValues] = React.useState(values)
  const [visible, setVisible] = React.useState({ button: false, icon: false })

  const handleChangeInput = e => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value })
  }

  const handleFocusInput = e => {
    setVisible({ button: true, icon: e.target.name })
  }

  const cancelForm = () => {
    setEditValues(values)
    setVisible(false)
  }

  const handleSubmitProfile = e => {
    e.preventDefault()
    if (editValues.name && editValues.email && editValues.password) {
      dispatch(fetchEditUser(editValues))
      setValues(editValues)
      setVisible(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmitProfile}>
      <div className='input'>
        <Input
          value={editValues.name}
          type='text'
          name='name'
          placeholder='Имя'
          icon={visible?.icon === 'name' ? 'CloseIcon' : 'EditIcon'}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
        />
      </div>

      <div className='input'>
        <Input
          value={editValues.email}
          type='email'
          name='email'
          placeholder='Login'
          icon={visible?.icon === 'email' ? 'CloseIcon' : 'EditIcon'}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
        />
      </div>

      <div className='input'>
        <Input
          value={editValues.password}
          type='password'
          name='password'
          placeholder='Пароль'
          icon={visible?.icon === 'password' ? 'CloseIcon' : 'EditIcon'}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
        />
      </div>
      {visible.button && (
        <div className={styles.submit}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={cancelForm}
            className='text_type_main-default text_color_accent route-link'
          >
            Отмена
          </span>
          <Button htmlType='submit'>Сохранить</Button>
        </div>
      )}
    </form>
  )
}

export default ProfileUser
