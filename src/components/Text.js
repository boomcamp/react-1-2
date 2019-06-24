import React from 'react'
import PropTypes from 'prop-types'

function Text(props){
    const {isHeader, text} = props;
    return isHeader ? <h4>{text}</h4> : <p>{text}</p>
}

export default Text;

Text.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  isHeader: PropTypes.bool.isRequired,
};


