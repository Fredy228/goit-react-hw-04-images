import { BtnLoadMore } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({onLoadMore}) => {
    return(
        <BtnLoadMore type="button" onClick={onLoadMore}>Load more</BtnLoadMore>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired
}