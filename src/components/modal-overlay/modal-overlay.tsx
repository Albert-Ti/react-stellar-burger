import React from 'react'
import {TModal} from '../../types'
import styles from './modal-overlay.module.css'

const ModalOverlay: React.FC<TModal> = ({onClose}) => {
  return <div onClick={() => onClose()} className={styles.overlay}></div>
}

export default ModalOverlay
