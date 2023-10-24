import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useForm } from '../../hooks'
import { fetchEditUser } from '../../redux/user/actions'
import { userStore } from '../../redux/user/slice'
import { THandleSubmitForm } from '../../types'
import styles from './profile-user.module.css'

const ProfileUser = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector(userStore)

  const { values, setValues } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || ''
  })

  const [editValues, setEditValues] = React.useState(values)
  const [visible, setVisible] = React.useState<{ button: boolean; icon: string }>({
    button: false,
    icon: ''
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value })
  }

  const handleFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setVisible({ button: true, icon: e.target.name })
  }

  const cancelForm = () => {
    setEditValues(values)
    setVisible({ button: false, icon: '' })
  }

  const handleSubmitProfile = (e: THandleSubmitForm) => {
    e.preventDefault()
    if (editValues.name && editValues.email && editValues.password) {
      dispatch(fetchEditUser(editValues))
      setValues(editValues)
      setVisible({ button: false, icon: '' })
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
