import React from 'react';
import PropTypes from 'prop-types';

export default function Text(props){
    return (
        props.isHeader ? <h4>{props.text}</h4> : <p>{props.text}</p>
    )
}

Text.propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    isHeader: PropTypes.bool.isRequired,
  };