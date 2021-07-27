import React from 'react';

import ImageGalleryItem from '../ImageGalleryItem';

import PropTypes from 'prop-types';

import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClickImg={onClickImg}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
