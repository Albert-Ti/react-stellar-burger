import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogout } from '../../redux/actions/user-action'
import { userState } from '../../redux/slice/user-slice'
import styles from './profile-nav.module.css'

const ProfileNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { logoutStatus } = useSelector(userState)

  const handleLogout = () => {
    dispatch(fetchLogout())
    logoutStatus && navigate('/login')
  }

  return (
    <div className={styles.links}>
      <nav className={styles.nav}>
        <Link to='/profile' className={styles.link}>
          <p className='text text_type_main-medium'>Профиль</p>
        </Link>
        <Link to='/profile/order' className={styles.link}>
          <p className='text text_type_main-medium text_color_inactive'>История заказов</p>
        </Link>
        <Link onClick={handleLogout} to='#' className={styles.link}>
          <p className='text text_type_main-medium text_color_inactive'>Выход</p>
        </Link>
      </nav>
      <div className={styles.description}>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  )
}

export default ProfileNav
