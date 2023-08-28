import { Link, Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import styles from './layout.module.css'

const Layout = () => {
  const { pathname } = useLocation()

  return (
    <div className={styles.app}>
      <AppHeader />
      {pathname === '/' && (
        <h1 className={`text text_type_main-medium ${styles.appTitle}`}>
          <p>Hi,</p>
          <p>my name is Albert,</p>
          <p>
            This is my project <span className='text_color_accent'>Stellar Burger</span>,
          </p>
          <Link className='route-link' to='/ingredients'>
            click to continue {'>>>'}
          </Link>
        </h1>
      )}
      <Outlet />
    </div>
  )
}

export default Layout
