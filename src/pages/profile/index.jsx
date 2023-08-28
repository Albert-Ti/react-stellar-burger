import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useForm } from '../../hooks/use-form'
import styles from './profile.module.css'
import ProfileNav from '../../components/profile-nav/profile-nav'

const Profile = () => {
  const { form, setForm } = useForm()
  const { editUser } = useAuth()

  const [editForm, setEditForm] = React.useState(form)
  const [visible, setVisible] = React.useState({ button: false, icon: false })

  const handleChangeInput = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleFocusInput = e => {
    setVisible({ button: true, icon: e.target.name })
  }

  const cancelForm = () => {
    setEditForm(form)
    setVisible(false)
  }

  const submitForm = async e => {
    e.preventDefault()
    if (editForm.name && editForm.email && editForm.password) {
      await editUser(editForm)
      setForm(editForm)
      setVisible(false)
    }
  }
  return (
    <div className={styles.profile}>
      <ProfileNav />
      <form className={styles.form}>
        <div className='input'>
          <Input
            value={editForm.name}
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
            value={editForm.email}
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
            value={editForm.password}
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
            <Button onClick={submitForm} htmlType='submit'>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Profile
