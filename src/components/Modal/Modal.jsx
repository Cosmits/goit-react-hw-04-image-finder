import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledModal, StyledOverlay } from './Modal.styled';

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
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <img src={largeImageURL} alt={tags} />
      </StyledModal>
    </StyledOverlay>
  );

}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

