import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query.trim() === '') return;

    const fetchImages = async () => {
      const apiKey = '37208715-2f059b20d89d3ba30564c9c4f';
      const perPage = 12;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
        );

        const newImages = response.data.hits;

        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error.message);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal onCloseModal={handleCloseModal} image={selectedImage} />
      )}
    </div>
  );
};

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  showModal: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;
