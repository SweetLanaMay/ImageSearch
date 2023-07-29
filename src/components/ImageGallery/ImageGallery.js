import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
