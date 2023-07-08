import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import TitleH1 from 'components/TitleH1';

import { StyledContainer } from 'components/TitleH1/TitleH1.styled';
import { StyledImageGallery } from './ImageGallery.styled';


const ImageGallery = ({ images, searchValue, totalHits }) => {
  return (
    <>
      <TitleH1 searchValue={searchValue} totalHits={totalHits}></TitleH1>
      <StyledContainer>
        <StyledImageGallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </StyledImageGallery>
      </StyledContainer>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  searchValue: PropTypes.string.isRequired,
  totalHits: PropTypes.number,
};

export default ImageGallery;