import { Outlet } from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import styles from './layout.module.css'
import React from 'react'

const Layout = React.memo(() => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  )
})

export default Layout
