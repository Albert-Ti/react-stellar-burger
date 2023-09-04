import { Outlet } from 'react-router-dom'
import ProfileNav from '../../components/profile-nav/profile-nav'
import styles from './profile.module.css'

const Profile = () => {
  return (
    <section className={styles.profile}>
      <div className={styles.nav}>
        <ProfileNav />
      </div>
      <Outlet />
    </section>
  )
}

export default Profile
