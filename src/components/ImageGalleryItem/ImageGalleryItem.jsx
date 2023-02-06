import { Item, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({imgData, name, toggleModal}) => {
    return(
        <Item>
            <Image src={imgData.webformatURL} alt={name} onClick={() => {toggleModal(imgData.largeImageURL)}}/>
        </Item>
    )
}

ImageGalleryItem.propTypes = {
    imgData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired
}