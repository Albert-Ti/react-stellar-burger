import OrderItem from '../../components/order-item/order-item'
import { burgersData } from '../../utils/staticDataBurgers'
import styles from './feed-orders.module.css'

const FeedOrders = () => {
  return (
    <>
      <h1 className=' text_type_main-large title'>Лента заказов</h1>
      <main className='main'>
        <section className={`custom-scroll ${styles.orderList}`}>
          {burgersData.map(burger => (
            <OrderItem
              key={burger.id}
              id={burger.id}
              number={burger.number}
              title={burger.title}
              price={burger.price}
              date={burger.date}
              status={burger.status}
              items={burger.items}
            />
          ))}
        </section>
        <section className={styles.orderDietails}>
          <div className={styles.status}>
            <div className={styles.progress}>
              <h3 className={`text text_type_main-medium ${styles.titleProgress}`}>Готовы:</h3>
              <span className='text_type_digits-default text_color_success'>034533</span>
              <span className='text_type_digits-default text_color_success'>034532</span>
              <span className='text_type_digits-default text_color_success'>034530</span>
              <span className='text_type_digits-default text_color_success'>034527</span>
              <span className='text_type_digits-default text_color_success'>034525</span>
            </div>
            <div className={styles.progress}>
              <h3 className={`text text_type_main-medium ${styles.titleProgress}`}>В работе:</h3>
              <span className='text_type_digits-default'>034538</span>
              <span className='text_type_digits-default'>034541</span>
              <span className='text_type_digits-default'>034542</span>
            </div>
          </div>
          <div>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            <span className={`${styles.timeProgress} text_type_digits-large`}>28 752</span>
          </div>
          <div>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <span className={`${styles.timeProgress} text_type_digits-large`}>138</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default FeedOrders
