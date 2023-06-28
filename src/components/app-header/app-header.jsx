import headerStyles from './app-header.module.css'
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>

        <nav className={headerStyles.nav}>
          <a href='#' className={headerStyles.link}>
            <BurgerIcon />
            <p className="text text_type_main-default ">
              Конструктор
            </p>
          </a>

          <a href='#' className={headerStyles.link}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </a>
        </nav>

        <div className={headerStyles.logo}>
          <Logo />
        </div>

        <a href='#' className={headerStyles.profile}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </a>

      </div>
    </header>
  )
}

export default AppHeader;