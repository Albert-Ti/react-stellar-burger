import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import {createPortal} from 'react-dom'
import {TModal} from '../../types'
import {modalElement} from '../../utils/constants'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

const Modal: React.FC<TModal> = ({children, onClose}) => {
  React.useEffect(() => {
    function clickEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', clickEscape)
    return () => document.removeEventListener('keydown', clickEscape)
  }, [onClose])

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.btn}>
          <CloseIcon onClick={() => onClose()} type='primary' />
        </button>
        {children}
      </div>
    </div>,
    modalElement
  )
}

export default Modal
