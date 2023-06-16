import React from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients.module.css';

const Ingredients = ({ name, price, image, type }) => {
   const [countBurger, setCountBurger] = React.useState(0);

   const onClickCounter = type => {
      if (type === 'bun') {
         setCountBurger(1);
      } else {
         setCountBurger(countBurger + 1);
      }
   }

   return (
      <figure onClick={() => onClickCounter(type)} className={styles.items}>
         {countBurger !== 0 && <Counter count={countBurger ? countBurger : null} size="default" extraClass="m-1" />}
         <img src={image} alt={name} />

         <figcaption style={{ textAlign: 'center' }}>
            <div className={styles.info}>
               <span className='text_type_digits-default'>{price}</span>
               <CurrencyIcon />
            </div>
            <p className='text text_type_main-default'>{name}</p>
         </figcaption>

      </figure>
   )
}

export default Ingredients;