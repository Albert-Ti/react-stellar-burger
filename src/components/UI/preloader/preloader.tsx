import styles from './preloader.module.css'

const Preloader = () => {
  return (
    <div className='wrapper'>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Preloader
