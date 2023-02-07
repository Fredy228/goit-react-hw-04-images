import {useState} from "react";
import PropTypes from 'prop-types';
import { BarBlock, SearchForm, SearchFormButton, SearchFormInput, SearchFormButtonLabel } from "./Searchbar.styled";

export const Searchbar = ({onSubmitForm}) => {

    const [query, setQuery] = useState('');

    const handleChange = event => {
        const {value} = event.currentTarget;
        setQuery(value);
      }

    const submitForm = event => {
        event.preventDefault();
        if(query.trim() !== '') {
            onSubmitForm(query);
        } else {
            window.alert('Enter the query');
        }
        event.currentTarget.reset();
    }

    return (
        <BarBlock>
            <SearchForm onSubmit={submitForm}>
                <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>
                <SearchFormInput 
                onChange={handleChange} 
                placeholder={'Search images and photos'}
                type="text"
                autocomplete="off"
                autoFocus/>
            </SearchForm>
        </BarBlock>
    )
    
}

Searchbar.propTypes = {
    onSubmitForm: PropTypes.func.isRequired
}