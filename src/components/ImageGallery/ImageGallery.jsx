import React from "react";
import PropTypes from 'prop-types';
import {ImageGalleryList} from './ImageGallery.styled';
import {getImgagesAPI} from 'components/PixabayAPI/PixabayAPI';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends React.Component {
    state = {
        hits: [],
        isShowModal: false,
    }

    async componentDidUpdate(prevProps) {
        const {querySearch, pageSearch, changeStatus, toggleButton} = this.props;
        const {hits} = this.state;

        try {
            if(querySearch !== prevProps.querySearch) {
                changeStatus('pending');
                const resaltNew = await hitsPushArr([]);
                this.setState({hits: resaltNew});
                changeStatus('resolved');
            }

            if(pageSearch > prevProps.pageSearch) {
                changeStatus('pending');
                const resaltMore = await hitsPushArr(hits);
                this.setState({hits: resaltMore});
                changeStatus('resolved');
            }
        } catch (error) {
            changeStatus('rejected')
            console.log(error)
        }

        async function hitsPushArr(parametrHits) {
            const response = await getImgagesAPI(querySearch, pageSearch);
            toggleButton(response.totalHits);
            let hitArray = [...parametrHits];
                response.hits.map(({id, webformatURL, largeImageURL}) => {
                 return hitArray.push({
                     id,
                     webformatURL,
                     largeImageURL
                 })
                })
            return hitArray
        }
    }

    render() {
        const {querySearch, toggleModal} = this.props;
        const {hits} = this.state

        if(hits.length !== 0) {
            return (
                
                <ImageGalleryList>
                    {this.state.hits.map((item) => {
                        return <ImageGalleryItem 
                        key={item.id} 
                        imgData={item} 
                        name={querySearch}
                        toggleModal={toggleModal}/>
                    })}
                </ImageGalleryList>
            )
        }

    }
}

ImageGallery.propTypes = {
    querySearch: PropTypes.string.isRequired,
    pageSearch: PropTypes.number.isRequired,
    changeStatus: PropTypes.func.isRequired,
    toggleButton: PropTypes.func.isRequired
}

export default ImageGallery