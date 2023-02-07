import {useEffect} from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, ImageLarge } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({toggleModal, url}) => {

    useEffect(() => {
        function handleKeyDown(event) {
            if(event.code === 'Escape') {
                toggleModal()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [toggleModal])

    const handleBackdropClick = (event) => {
        if(event.target === event.currentTarget) {
            toggleModal();
        }
    }

    return(
        createPortal(
            <Overlay onClick={handleBackdropClick}>
                <ModalWindow>
                    <ImageLarge src={url} alt="Large image"/>
                </ModalWindow>
            </Overlay>, 
            modalRoot
        )
    )
}

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
}