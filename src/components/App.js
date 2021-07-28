import React, { useState, useEffect } from 'react';
import imagesAPI from '../api/images-api';

import Layout from './Layout';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import LoaderSpinner from './LoaderSpinner';
import Modal from './Modal';
import Error from './Error';

import ButtonIcon from './ButtonIcon';
import { HiOutlineX } from 'react-icons/hi';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.scss';

export default function App() {
  const [images, setImages] = useState([]);
  const [imagesPageList, setImagesPageList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImgList = async () => {
      try {
        setLoading(true);
        const imagesPageList = await imagesAPI.fetchImages(searchQuery, page);
        setImagesPageList(imagesPageList);
        setImages(prevImages => [...prevImages, ...imagesPageList]);
        setLoading(false);

        if (imagesPageList.length === 0) {
          setError(`There are no images on your request "${searchQuery}"`);
        }
      } catch (error) {
        setError('Whoops, something went wrong. Enter your request again');
      } finally {
        setLoading(false);
        // this.scroll();
      }
    };
    fetchImgList();
  }, [searchQuery, page]);

  const handleSearchQuerySubmit = searchQuery => {
    setSearchQuery(searchQuery);
    updateStates();
  };

  const updateStates = () => {
    setImages([]);
    setPage(1);
    setError(null);
    setImagesPageList([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onOpenModal = e => {
    setLargeImageURL(e.target.dataset.source);
    setTags(e.target.alt);
    toggleModal();
  };

  return (
    <Layout>
      <Searchbar handleSubmit={handleSearchQuerySubmit} />

      {error && <Error errorContent={error} />}

      {loading && <LoaderSpinner />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} onClickImg={onOpenModal} />
      )}

      {imagesPageList.length > 11 && !loading && !error && (
        <Button contentBtn="Load More" onLoadMore={loadMore} />
      )}
      {imagesPageList.length < 11 &&
        imagesPageList.length > 0 &&
        !loading &&
        !error && <Button disabled contentBtn="End" />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
          <ButtonIcon
            className={styles.ButtonIcon}
            onClick={toggleModal}
            aria-label="Close image"
          >
            <HiOutlineX />
          </ButtonIcon>
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </Layout>
  );
}
