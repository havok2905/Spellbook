import {
  MouseEvent,
  ReactNode,
  useEffect
} from 'react';

import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  portalElement: HTMLElement;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  portalElement
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', 'overflow: hidden');
    } else {
      document.body.setAttribute('style', '');
    }
  }, [isOpen])

  const handleOnCloseClick = () => {
    onClose();
  }

  const handleBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation();
    handleOnCloseClick();
  };

  const modal = (
    <>
      <div className={styles.modal}>
        {children}
      </div>
      <div
        className={styles.modalBackdrop}
        onClick={handleBackgroundClick}
      />
    </>
  );

  if (!isOpen) return null;
  
  return createPortal(
    modal,
    portalElement
  );
};
