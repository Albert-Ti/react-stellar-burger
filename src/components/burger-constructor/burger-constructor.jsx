import React from 'react';

import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = ({ bun, otherIngredient, remove }) => {
  const { text, price, thumbnail, isLocked } = bun;
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    setTotalPrice(otherIngredient.reduce((acc, item) => acc + item.price, bun.price));
  })

  const removeIngredient = index => {
    remove(otherIngredient.filter((_, i) => i !== index));
  }

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        {
          text &&
          <ConstructorElement
            type="top"
            isLocked={isLocked}
            text={text}
            price={price}
            thumbnail={thumbnail}
          />
        }
        <div className={`custom-scroll ${styles.lists}`}>
          {
            otherIngredient.length > 0 &&
            otherIngredient.map((item, i) => (
              <div key={i} className={styles.list} >
                <DragIcon />
                <ConstructorElement
                  text={item.text}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  handleClose={() => removeIngredient(i)}
                />
              </div>

            ))
          }
        </div>
        {
          text &&
          <ConstructorElement
            type="bottom"
            isLocked={isLocked}
            text={text}
            price={price}
            thumbnail={thumbnail}
          />
        }
      </div>
      {
        text &&
        <div className={styles.priceBurger}>
          <span className='text text_type_digits-medium'>{totalPrice} <CurrencyIcon /></span>
          <Button htmlType='button'>Оформить заказ</Button>
        </div>
      }
    </section>
  )
}

export default BurgerConstructor;