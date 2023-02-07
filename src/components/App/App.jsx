import {useState, useCallback} from "react";
import { Container } from "./App.styled";
import {Searchbar} from 'components/Searchbar/Searchbar';
import {ImageGallery} from 'components/ImageGallery/ImageGallery';
import { Button } from "components/Button/Button";
import {Modal} from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

export const App = () => {
 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  const hendleSearchQuery = (searchName) => {
    if(searchName !== query) {
      setQuery(searchName);
      setPage(1)
    }
  }

  const changePage = () => {
    setPage(prevS => prevS + 1)
  }
  
  const changeStatus = useCallback((statusNew) => {
    setStatus(statusNew);
  }, [])

  const toggleButton = useCallback((totalHits) => {
    if (totalHits / 12 >= page) {
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }
  }, [page])

  const toggleModal = (url) => {
    setIsShowModal(prevS => !prevS);
    setLargeImg(url);
  }
   
    return (
      <>
        <Searchbar onSubmitForm={hendleSearchQuery}/>
        <Container>
          <ImageGallery 
          querySearch={String(query)} 
          pageSearch={page}
          changeStatus={changeStatus}
          toggleButton={toggleButton}
          toggleModal={toggleModal}/>

          {status === 'pending' && <Loader/>}

          {isShowModal && <Modal url={largeImg} toggleModal={toggleModal}/>}

          {isShowButton && <Button onLoadMore={changePage}/>}
        </Container>
      </>
    )
}