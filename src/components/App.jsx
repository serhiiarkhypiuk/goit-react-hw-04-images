import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageErrorView from './ImageErrorView/ImageErrorView';
import '../styles.css';
import { Button as LoadMoreButton } from './Button/Button';
import { Div, IntroductoryText } from './SearchBar/Searchbar.styled';
import Loader from './Loader/Loader';
import ModalWindow from './Modal/Modal';
import api from './services/services';

const App = () => {
  const [imageQuery, setImageQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currImg, setCurrImg] = useState({});

  const bottomRef = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time images loaded
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [images]);

  useEffect(() => {
    if (imageQuery !== '') {
      setStatus('pending');
    }
    if (!imageQuery) {
      return;
    }
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageQuery]);

  const fetchImages = () => {
    setStatus('pending');

    api
      .getImages(imageQuery, page)
      .then(results => results.hits)
      .then(prevImages => {
        setImages([...images, ...prevImages]);
        setPage(prevPage => prevPage + 1);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleFormSubmit = imageQuery => {
    setImages([]);
    setImageQuery(imageQuery);
    setPage(1);
  };

  const toggleModal = image => {
    setShowModal(!showModal);
    setCurrImg(image);
  };

  return (
    <Div className="App">
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && (
        <IntroductoryText>What do you want to find?</IntroductoryText>
      )}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && !images.length && (
        <ImageErrorView
          message={`No images regarding ${imageQuery} was found!`}
        />
      )}

      {status === 'rejected' && <ImageErrorView message={error.message} />}

      {status === 'resolved' && (
        <ImageGallery images={images} onOpenModal={toggleModal} />
      )}

      {(images.length > 11) & (status !== 'pending') ? (
        <LoadMoreButton onClick={fetchImages} />
      ) : null}

      {showModal && (
        <ModalWindow onClose={toggleModal}>
          <img src={currImg.largeImageURL} alt={currImg.tags} />
        </ModalWindow>
      )}

      <div ref={bottomRef}></div>
    </Div>
  );
};

export default App;
