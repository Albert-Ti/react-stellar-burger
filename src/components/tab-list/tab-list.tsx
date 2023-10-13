import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks'
import { getCurrentTab, ingredientsStore } from '../../redux/ingredients/slice'
import { isBun, isMain, isSauce, tabBun, tabMain, tabSauce } from '../../utils/constants'
import styles from './tab-list.module.css'

const TabList = () => {
  const dispatch = useAppDispatch()
  const { currentTab } = useSelector(ingredientsStore)

  return (
    <div className={styles.tabLists}>
      <a className={styles.link} href={`#${isBun}`}>
        <Tab
          value={tabBun}
          active={currentTab === tabBun}
          onClick={value => dispatch(getCurrentTab(value))}
        >
          Булки
        </Tab>
      </a>

      <a className={styles.link} href={`#${isSauce}`}>
        <Tab
          value={tabSauce}
          active={currentTab === tabSauce}
          onClick={value => dispatch(getCurrentTab(value))}
        >
          Соусы
        </Tab>
      </a>

      <a className={styles.link} href={`#${isMain}`}>
        <Tab
          value={tabMain}
          active={currentTab === tabMain}
          onClick={value => dispatch(getCurrentTab(value))}
        >
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default TabList
