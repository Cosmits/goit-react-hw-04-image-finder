import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ tags, largeImageURL, onCloseModal }) {



  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  //================================================================
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
   

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [onCloseModal])

  //================================================================
  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );

}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

