import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
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

  const classesAnimation = ({ isActive }) =>
    isActive ? `${styles.link} text_color_primary` : `${styles.link} text_color_inactive`

  return (
    <div className={styles.links}>
      <nav className={styles.nav}>
        <NavLink end to='/profile' className={classesAnimation}>
          <p className='text text_type_main-medium'>Профиль</p>
        </NavLink>
        <NavLink end to='/profile/order' className={classesAnimation}>
          <p className='text text_type_main-medium'>История заказов</p>
        </NavLink>
        <NavLink end onClick={handleLogout} to='#' className={classesAnimation}>
          <p className='text text_type_main-medium  text_color_inactive'>Выход</p>
        </NavLink>
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
