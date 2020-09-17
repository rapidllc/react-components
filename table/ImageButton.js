import React from 'react';
import PropTypes from 'prop-types';

import './ImageButton.scss';

const ImageButton = ({ src, onClick, alt }) => (
  <img
    className="ImageButton"
    onClick={onClick}
    onKeyPress={onClick}
    role="presentation"
    src={src}
    alt={alt}
  />
);

ImageButton.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageButton;