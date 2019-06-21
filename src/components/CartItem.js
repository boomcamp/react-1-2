import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function CartItem(props) {
    const { item, deleteFromCartFn } = props;
    const { id, imageUrl, title, quantity, description, price } = item;
    
    return (
    <div className="product">
        <img src={imageUrl} />
        <div className="product-info">
            <Text isHeader={true} text={title} />
            <Text isHeader={false} text={quantity} />
            <Text isHeader={false} text={description} />
            <Text isHeader={false} text={price} />
            <button onClick={() => deleteFromCartFn(item.id)}>
                Remove from Cart
            </button>
        </div>
    </div>
    )

}

CartItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    deleteFromCartFn: PropTypes.func.isRequired,
  };