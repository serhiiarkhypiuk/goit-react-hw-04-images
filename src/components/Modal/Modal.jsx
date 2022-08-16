import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    event.code === 'Escape' && this.props.onClose();
  };

  handleOverlayClick = event => {
    event.currentTarget === event.target && this.props.onClose();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }
}

export default ModalWindow;
