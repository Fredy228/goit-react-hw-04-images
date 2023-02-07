import React from "react";
import { Container } from "./App.styled";
import {Searchbar} from 'components/Searchbar/Searchbar';
import {ImageGallery} from 'components/ImageGallery/ImageGallery';
import { Button } from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

class App extends React.Component {
  state = {
    query: '',
    page: 1,
    status: 'idle',
    isShowButton: false,
    isShowModal: false,
    largeImg: ''
  }
    // 'idle'
    // 'pending'
    // 'resolved'
    // 'rejected'

  hendleSearchQuery = (searchName) => {
    if(searchName !== this.state.query) {
      this.setState({query: searchName, page: 1})
    }
  }

  changePage = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  }

  changeStatus = (statusNow) => {
    this.setState({status: statusNow})
  }

  toggleButton = (totalHits) => {
    if (totalHits / 12 >= this.state.page) {
      this.setState({isShowButton: true})
    } else {
      this.setState({isShowButton: false})
    }
  }

  toggleModal = (url) => {
    this.setState(({isShowModal}) => ({isShowModal: !isShowModal, largeImg: url}));
  }



  render () {
    const {query, page, status, isShowButton, isShowModal, largeImg} = this.state;
   
    return (
      <>
        <Searchbar onSubmitForm={this.hendleSearchQuery}/>
        <Container>
          <ImageGallery 
          querySearch={String(query)} 
          pageSearch={page}
          changeStatus={this.changeStatus}
          toggleButton={this.toggleButton}
          toggleModal={this.toggleModal}/>

          {status === 'pending' && <Loader/>}

          {isShowModal && <Modal url={largeImg} toggleModal={this.toggleModal}/>}

          {isShowButton && <Button onLoadMore={this.changePage}/>}
        </Container>
      </>
    )
  }
}
 export default App;