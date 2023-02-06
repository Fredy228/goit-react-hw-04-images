import React from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, ImageLarge } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')

class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (event) => {
        if(event.code === 'Escape') {
            this.props.toggleModal()
        }
    }

    handleBackdropClick = (event) => {
        if(event.target === event.currentTarget) {
            this.props.toggleModal();
        }
    }

    render() {
        return(
            createPortal(
                <Overlay onClick={this.handleBackdropClick}>
                    <ModalWindow>
                        <ImageLarge src={this.props.url} alt="Large image"/>
                    </ModalWindow>
                </Overlay>, 
                modalRoot
            )
        )
    }
}

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
}

export default Modal;