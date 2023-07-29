import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={image} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
