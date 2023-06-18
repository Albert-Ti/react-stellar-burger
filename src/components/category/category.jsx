import React from 'react';
import styles from './category.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


const Category = ({ toggleBun, index, onClickToggleBun, ...item }) => {
  const [countIngredient, setCountIngredient] = React.useState(0);

  return (
    <figure
      className={styles.categoryItem}
      onClick={
        item.type !== 'bun'
          ? () => setCountIngredient(countIngredient + 1)
          : () => onClickToggleBun(index)
      }>
      {
        toggleBun === index &&
        item.type === 'bun' &&
        <Counter count={1} size="default" extraClass="m-1" />
      }
      {
        countIngredient !== 0 &&
        <Counter count={countIngredient} size="default" extraClass="m-1" />
      }
      <img src={item.image} alt={item.name} />
      <figcaption style={{ textAlign: 'center' }}>
        <div className={styles.info}>
          <span className='text_type_digits-default'>{item.price}</span>
          <CurrencyIcon />
        </div>
        <p className='text text_type_main-default'>{item.name}</p>
      </figcaption>
    </figure>
  )
}

export default Category;