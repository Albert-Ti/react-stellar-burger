import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { visibleModalPropType } from '../../utils/prop-types'

import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'

export const modalElememt = document.getElementById('modal')

const Modal = ({ setVisibleModal, visibleModal, children }) => {
  const onCloseModal = () => {
    setVisibleModal({ ingredient: false, order: false })
  }

  React.useEffect(() => {
    function clickEscape(e) {
      if (e.key === 'Escape') setVisibleModal({ ingredient: false, order: false })
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [visibleModal])

  return createPortal(
    <ModalOverlay onCloseModal={onCloseModal} visibleModal={visibleModal}>
      <div
        onClick={e => e.stopPropagation()}
        className={`${styles.wrapper} ${visibleModal.order && styles.paddingOrder}`}
      >
        <h3
          className={`text text_type_main-large ${styles.title} ${
            visibleModal.order && styles.right
          }`}
        >
          {visibleModal.ingredient && <span>Детали ингридиента</span>}
          <button className={styles.btn}>
            <CloseIcon onClick={onCloseModal} />
          </button>
        </h3>
        {children}
      </div>
    </ModalOverlay>,
    modalElememt
  )
}

Modal.propTypes = {
  visibleModal: visibleModalPropType,
  setVisibleModal: PropTypes.func.isRequired
}

export default Modal
