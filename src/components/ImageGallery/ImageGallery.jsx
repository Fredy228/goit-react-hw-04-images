import {useEffect, useState, useRef} from "react";
import PropTypes from 'prop-types';
import {ImageGalleryList} from './ImageGallery.styled';
import {getImgagesAPI} from 'components/PixabayAPI/PixabayAPI';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({querySearch, pageSearch, changeStatus, toggleButton, toggleModal}) => {

    const [hits, setHits] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if(isFirstRender.current || querySearch === '') {
            isFirstRender.current = false
            return;
        }
        
        changeStatus('pending');
        getImgagesAPI(querySearch, pageSearch)
        .then(response => {
            let arrayImg = [];
            toggleButton(response.totalHits);
            response.hits.map(({id, webformatURL, largeImageURL}) => {
                return arrayImg.push({
                    id,
                    webformatURL,
                    largeImageURL
                })
            })
            return arrayImg;
        })
        .then(arrayImg =>{
            if (pageSearch > 1) {
                setHits(prevHits => [...prevHits, ...arrayImg])
            } else {
                setHits(arrayImg);
                window.scrollTo(0, 0);
            }
            changeStatus('resolved');
        })
        .catch(error => {
            changeStatus('rejected')
            console.log(error)
        })
    }, [querySearch, pageSearch])

        if(hits.length !== 0) {
            return (
                <ImageGalleryList>
                    {hits.map((item) => {
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

ImageGallery.propTypes = {
    querySearch: PropTypes.string.isRequired,
    pageSearch: PropTypes.number.isRequired,
    changeStatus: PropTypes.func.isRequired,
    toggleButton: PropTypes.func.isRequired
}