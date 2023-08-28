import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, useMatch } from 'react-router-dom'
import styles from './app-header.module.css'

const AppHeader = () => {
  const { pathname } = useLocation()

  const isHome = useMatch('/ingredients')
  const isProfile = useMatch('/profile')

  const isClassLinkHome = `text text_type_main-default ${
    pathname !== '/ingredients' ? 'text_color_inactive' : ''
  }`
  const isClassLinkProfile = `text text_type_main-default ${
    pathname !== '/profile' ? 'text_color_inactive' : ''
  }`
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link to='/ingredients' className={styles.link} state={{ from: { pathname } }}>
            <BurgerIcon type={isHome ? 'primary' : 'secondary'} />
            <p className={isClassLinkHome}>Конструктор</p>
          </Link>

          <Link to='#' className={styles.link} state={{ from: { pathname } }}>
            <ListIcon type={false ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
          </Link>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <Link to='/profile' className={styles.profileLink} state={{ from: { pathname } }}>
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className={isClassLinkProfile}>Личный кабинет</p>
        </Link>
      </nav>
    </header>
  )
}

export default AppHeader
