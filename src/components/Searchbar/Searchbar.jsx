import React from "react";
import PropTypes from 'prop-types';
import { BarBlock, SearchForm, SearchFormButton, SearchFormInput, SearchFormButtonLabel } from "./Searchbar.styled";

class Searchbar extends React.Component {
    state = {
        query: ''
    }

    handleChange = event => {
        const {value} = event.currentTarget;
        this.setState({query: value})
      }

    submitForm = (event) => {
        event.preventDefault();
        if(this.state.query.trim() !== '') {
            this.props.onSubmitForm(this.state.query)
        } else {
            window.alert('Enter the query')
        }
        event.currentTarget.reset()
    }

    render () {
        return (
            <BarBlock>
                <SearchForm onSubmit={this.submitForm}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>
                    <SearchFormInput 
                    onChange={this.handleChange} 
                    placeholder={'Search images and photos'}
                    type="text"
                    autocomplete="off"
                    autoFocus/>
                </SearchForm>
            </BarBlock>
        )
    }
}

Searchbar.propTypes = {
    onSubmitForm: PropTypes.func.isRequired
}

export default Searchbar;