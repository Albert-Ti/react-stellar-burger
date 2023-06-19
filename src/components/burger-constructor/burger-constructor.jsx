import React from 'react';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = ({ totalPrice, toggleBunId, newIngredient, bunItem }) => {


  return (
    <section className={styles.content}>
      {bunItem.name &&
        <div className={styles.bunItem}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={!toggleBunId ? bunItem.name : bunItem.name}
            price={!toggleBunId ? bunItem.price : bunItem.price}
            thumbnail={bunItem.image}
          />
        </div>}

      <div className={`custom-scroll ${styles.lists}`}>
        {newIngredient.map((item, i) => (
          <div key={i} className={styles.list} >
            <DragIcon />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>

      {bunItem.name &&
        <div className={styles.bunItem}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={!toggleBunId ? bunItem.name : bunItem.name}
            price={!toggleBunId ? bunItem.price : bunItem.price}
            thumbnail={bunItem.image}
          />
        </div>}

      {bunItem.name &&
        <div className={styles.priceBurger}>
          <span className='text text_type_digits-medium'>{totalPrice} <CurrencyIcon /></span>
          <Button htmlType='button'>Оформить заказ</Button>
        </div>}

    </section>
  )
}

export default BurgerConstructor;