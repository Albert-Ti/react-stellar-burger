import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredients = ({ element, bun, addBun, addedIngredients, setAddedIngredients }) => {
  const { type, name, price, image } = element;

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
      setAddedIngredients(prev => [
        ...prev,
        newIngredient
      ])
    }
  }

  const countIngredient = React.useMemo(() => {
    return addedIngredients.filter(item => item.text === name).length;
  }, [addedIngredients])

  return (
    <figure onClick={handleClickIngredient} className={styles.items}>
      {
        countIngredient > 0 &&
        <Counter count={countIngredient} size="default" extraClass="m-1" />
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

Ingredients.propTypes = {
  bun: PropTypes.object,
  addBun: PropTypes.func,
  addedIngredients: PropTypes.arrayOf(PropTypes.object),
  setAddedIngredients: PropTypes.func,

  element: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default Ingredients;