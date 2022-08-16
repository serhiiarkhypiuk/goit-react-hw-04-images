import React from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, id, small, alt, onClick }) => {
  return (
    <GalleryItem key={id} onClick={() => onClick(image)}>
      <GalleryItemImage src={small} alt={alt} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
