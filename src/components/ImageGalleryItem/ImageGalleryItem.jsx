import { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal/Modal';

import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImage
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };


  const { image: { tags, webformatURL, largeImageURL } } = props;
  
  return (
    <StyledImageGalleryItem>
      <StyledImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={toggleModal} />
      {isOpenModal && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onCloseModal={toggleModal}
        />
      )}
    </StyledImageGalleryItem>
  )

}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    userImageURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};