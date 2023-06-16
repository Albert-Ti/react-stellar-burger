import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = () => {
  return (
    <section className={styles.content}>
      <div className={`custom-scroll ${styles.lists}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'img'}
        />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={'img'}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'img'}
        />
      </div>

      <span className='text text_type_digits-medium'></span>
      <CurrencyIcon />
      <Button htmlType='button'>Оформить заказ</Button>
    </section>
  )
}

export default BurgerConstructor;