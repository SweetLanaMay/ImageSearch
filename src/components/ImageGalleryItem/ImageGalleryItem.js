import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem} onClick={onClick}>
      <img src={image.webformatURL} alt={image.tags} className={css.image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
