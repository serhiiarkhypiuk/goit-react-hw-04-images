import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          onClick={onOpenModal}
          image={image}
          key={image.id}
          small={image.webformatURL}
          large={image.largeImageURL}
          alt={image.tags}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
