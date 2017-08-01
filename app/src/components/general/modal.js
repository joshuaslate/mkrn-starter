import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

class Modal extends Component {
  static propTypes = {
    handleClose: PropTypes.func,
    heading: PropTypes.string,
    isOpen: PropTypes.bool,
    canScroll: PropTypes.bool,
    children: PropTypes.node,
  };

  componentDidMount = () => window.addEventListener('keyup', this.escapeClose);
  componentWillUnmount = () => window.removeEventListener('keyup', this.escapeClose);

  escapeClose = (e) => {
    if (e.which === 27 && this.props.isOpen) {
      this.props.handleClose(e);
    }
  }

  render() {
    const { handleClose, heading, isOpen, canScroll = false, children } = this.props;
    return (
      <div className={`modal ${isOpen ? 'is-open' : ''} ${canScroll ? 'can-scroll' : ''}`}>
        <div className="modal-container">
          <div className="modal-content">
            <button onClick={handleClose} className="button is-text is-danger">
              <span className="material-icons close">close</span>
            </button>
            <h3>{heading}</h3>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
