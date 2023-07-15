import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'

export const modalElememt = document.getElementById('modal')

const Modal = ({ onClose, showModal, children }) => {
  const animationClasses = [styles.modal, styles.visible]

  const handleClick = () => {
    onClose(false)
  }

  React.useEffect(() => {
    function clickEscape(e) {
      if (e.key === 'Escape') onClose(false)
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [showModal, onClose])

  return createPortal(
    <div className={showModal ? animationClasses.join(' ') : styles.modal}>
      <ModalOverlay onClose={handleClick} />
      <div
        onClick={e => e.stopPropagation()}
        className={`${styles.wrapper} ${showModal && styles.paddingOrder}`}
      >
        <h3 className={`text text_type_main-large ${styles.title} ${showModal && styles.right}`}>
          {false && <span>Детали ингридиента</span>}
          <button className={styles.btn}>
            <CloseIcon onClick={handleClick} />
          </button>
        </h3>
        {children}
      </div>
    </div>,
    modalElememt
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.any,
  onClose: PropTypes.func.isRequired
}

export default Modal
