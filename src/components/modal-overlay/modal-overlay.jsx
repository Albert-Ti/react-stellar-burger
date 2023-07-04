import { visibleModalPropType } from '../../utils/prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = ({ children, visibleModal, onCloseModal }) => {
  const animationClasses = [styles.overlay, styles.visible]

  return (
    <div
      onClick={() => onCloseModal()}
      className={
        visibleModal.order || visibleModal.ingredient ? animationClasses.join(' ') : styles.overlay
      }
    >
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  visibleModal: visibleModalPropType
}

export default ModalOverlay
