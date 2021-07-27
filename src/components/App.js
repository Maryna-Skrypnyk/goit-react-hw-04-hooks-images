import React, { Component } from 'react';
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
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.scss';

class App extends Component {
  state = {
    images: [],
    imagesPageList: [],
    searchQuery: '',
    loading: false,
    page: 1,
    largeImageURL: '',
    tags: '',
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: [], page: 1, error: null, imagesPageList: [] });
    }
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return toast.warn('Enter your request', {
        position: 'top-center',
        transition: Zoom,
        style: {
          top: 80,
          textAlign: 'center',
          width: 290,
          margin: '0 auto',
        },
      });
    }

    this.renderImagesList();
  };

  renderImagesList = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ loading: true });
      const imagesPageList = await imagesAPI.fetchImages(searchQuery, page);
      this.setState({ imagesPageList });

      this.setState(({ images, page, imagesPageList }) => ({
        images: [...images, ...imagesPageList],
        page: page + 1,
        loading: false,
        imagesPageList: [...imagesPageList],
      }));

      if (imagesPageList.length === 0) {
        this.setState(({ page }) => ({
          page: page - 1,
          error: `There are no images on your request "${searchQuery}"`,
        }));
      }
    } catch (error) {
      this.setState({
        error: 'Whoops, something went wrong. Enter your request again',
      });
    } finally {
      this.setState({ loading: false });
      // this.scroll();
    }
  };

  loadMore = () => {
    this.renderImagesList();
    this.scroll();
  };

  scroll = () => {
    scroll.scrollToBottom();
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({
      largeImageURL: e.target.dataset.source,
      tags: e.target.alt,
    });
    this.toggleModal();
  };

  disabledBtn = () => {
    this.setState(({ disabled }) => ({
      disabled: !disabled,
    }));
  };

  render() {
    const {
      images,
      searchQuery,
      tags,
      largeImageURL,
      showModal,
      loading,
      error,
      imagesPageList,
    } = this.state;

    return (
      <Layout>
        <Searchbar
          searchQuery={searchQuery}
          handleChange={this.handleChange}
          handleSubmit={this.handleSearchSubmit}
        />

        {error && <Error errorContent={error} />}

        {loading && <LoaderSpinner />}

        {images.length > 0 && !error && (
          <ImageGallery images={images} onClickImg={this.onOpenModal} />
        )}

        {imagesPageList.length > 11 && !loading && !error && (
          <Button contentBtn="Load More" onLoadMore={this.loadMore} />
        )}
        {imagesPageList.length < 11 &&
          imagesPageList.length > 0 &&
          !loading &&
          !error && <Button disabled contentBtn="End" />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
            <ButtonIcon
              className={styles.ButtonIcon}
              onClick={this.toggleModal}
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
}

export default App;
