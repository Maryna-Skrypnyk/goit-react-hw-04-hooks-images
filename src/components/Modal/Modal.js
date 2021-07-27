import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const ESC_KEY_CODE = 'Escape';
    // const ARROW_LEFT_KEY_CODE = 'ArrowLeft';
    // const ARROW_RIGHT_KEY_CODE = 'ArrowRight';

    if (e.code === ESC_KEY_CODE) {
      this.props.onClose();
    }

    // if (e.code === ARROW_LEFT_KEY_CODE) {
    //   this.props.lightboxImageMove(-1);
    // }

    // if (e.code === ARROW_RIGHT_KEY_CODE) {
    //   this.props.lightboxImageMove(1);
    // }
  };

  handleEventOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleEventOverlay}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
