import PropTypes from 'prop-types'

export const ingredientPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired
}).isRequired

export const ingredientConstructorPropType = PropTypes.shape({
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  isLocked: PropTypes.bool,
  info: PropTypes.objectOf(PropTypes.number)
}).isRequired

export const visibleModalPropType = PropTypes.shape({
  order: PropTypes.bool.isRequired,
  ingredient: PropTypes.bool.isRequired
})

export const orderPropType = PropTypes.shape({
  name: PropTypes.string,
  number: PropTypes.number,
  updatedAt: PropTypes.string,
  status: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string)
})
