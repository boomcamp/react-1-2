import React from 'react';
import Text from './Text';
import PropTypes from 'prop-types';

export default function CartItem(props) {
    const { item, deleteFromCart } = props;
    {console.log(deleteFromCart)}
    return (
        <div className="product">
            <img src={item.imageUrl} />
            <div className="product-info">
                <Text isHeader={true} text={item.title} />
                <Text isHeader={false} text={item.quantity} />
                <Text isHeader={false} text={item.description} />
                <Text isHeader={false} text={item.price} />
                <button onClick={() => deleteFromCart(item.id)}>Remove from Cart</button>
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
};