import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {useSelector} from 'react-redux'
import {Link, useLocation, useMatch} from 'react-router-dom'
import {userStore} from '../../redux/user/slice'
import styles from './app-header.module.css'

const AppHeader = () => {
  const {pathname} = useLocation()
  const {user} = useSelector(userStore)

  const isHome = useMatch('/')
  const isProfile = useMatch('/profile')
  const isFeed = useMatch('/feed')

  const isClassLinkHome = `text text_type_main-default ${pathname !== '/' ? 'text_color_inactive' : ''}`
  const isClassLinkProfile = `text text_type_main-default ${
    pathname !== '/profile' ? 'text_color_inactive' : ''
  }`
  const isClassLinkFeed = `text text_type_main-default ${
    pathname !== '/feed' ? 'text_color_inactive' : ''
  }`
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link to='/' className={styles.link} state={{from: {pathname}}}>
            <BurgerIcon type={isHome ? 'primary' : 'secondary'} />
            <p className={isClassLinkHome}>Конструктор</p>
          </Link>

          <Link to='/feed' className={styles.link} state={{from: {pathname}}}>
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <p className={isClassLinkFeed}>Лента заказов</p>
          </Link>
        </div>

        <Link to='/' className={styles.logo}>
          <Logo />
        </Link>

        <Link to='/profile' className={styles.profileLink} state={{from: {pathname}}}>
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className={isClassLinkProfile}>{user ? user.name : 'Личный кабинет'}</p>
        </Link>
      </nav>
    </header>
  )
}

export default AppHeader
