import OrderItem from '../../components/order-item/order-item'
import { burgersData } from '../../utils/staticDataBurgers'
import styles from './history-orders.module.css'

const HistoryOrders = () => {
  return (
    <div className={`custom-scroll ${styles.content}`}>
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
    </div>
  )
}

export default HistoryOrders
