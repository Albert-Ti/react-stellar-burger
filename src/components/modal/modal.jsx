import PropTypes from 'prop-types'
import React from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

export const modalElememt = document.getElementById('modal')

const Modal = ({ children, onClose }) => {
  React.useEffect(() => {
    function clickEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [])

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.btn}>
          <CloseIcon onClick={() => onClose()} />
        </button>
        {children}
      </div>
    </div>,
    modalElememt
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default Modal
