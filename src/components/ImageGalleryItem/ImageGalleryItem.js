import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClickImg,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={onClickImg}
        className={styles.ImageGalleryItemImage}
        data-source={largeImageURL}
      />
    </li>
  );
};

// ImageGalleryItem.defaultProps = {
//   webformatURL: 'no image',
//   largeImageURL: 'no image',
// };

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  // onClickImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
