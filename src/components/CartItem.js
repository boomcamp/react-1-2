import React from 'react';
import PropTypes from 'prop-types';

import Text from './Text';

export default function CartItem(props) {
    const { item, deleteFromCart, handleToggleView } = props;
    
    return (
        <div className="product">
        <img src={item.imageUrl} />
        <div className="product-info">
            <Text isHeader={true} text={item.title} />
            <Text isHeader={true} text={item.qty} />
            <Text isHeader={false} text={item.description} />
            <Text isHeader={false} text={item.price} />

            <button onClick={() => deleteFromCart(item.id)}>Remove From Cart</button>
        </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    deleteFromCart : PropTypes.func.isRequired,
  };