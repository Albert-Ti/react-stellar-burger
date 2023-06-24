import React from 'react';

import styles from './ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredients = ({ element, addOtherIngredient, addBun, newIngredients, bun }) => {
  const { type, name, price, image } = element;
  const [count, setCount] = React.useState(0);

  const handleClickIngredient = () => {
    const newIngredient = {
      type: type,
      isLocked: type === 'bun' && true,
      text: name,
      price: price,
      thumbnail: image,
    }
    if (newIngredient.type === 'bun') {
      addBun(newIngredient)
    } else {
      addOtherIngredient(prev => [
        ...prev,
        newIngredient
      ])
    }
  }

  React.useEffect(() => {
    setCount(newIngredients.filter(item => item.text === name).length)
  }, [handleClickIngredient])

  return (
    <figure onClick={handleClickIngredient} className={styles.items}>
      {
        count > 0 &&
        <Counter count={count} size="default" extraClass="m-1" />
      }
      {
        bun.text === name &&
        <Counter count={1} size="default" extraClass="m-1" />
      }
      <img id='img' src={image} alt={name} />

      <figcaption style={{ textAlign: 'center' }}>
        <div className={styles.info}>
          <span id='price' className='text_type_digits-default'>{price}</span>
          <CurrencyIcon />
        </div>
        <p id='title' className='text text_type_main-default'>{name}</p>
      </figcaption>

    </figure>
  )
}

export default Ingredients;