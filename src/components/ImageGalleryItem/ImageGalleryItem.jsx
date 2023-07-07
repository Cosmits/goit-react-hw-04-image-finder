import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function ImageGalleryItem(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };


  const { image: { tags, webformatURL, largeImageURL } } = props;
  
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image"
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
    </li>
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