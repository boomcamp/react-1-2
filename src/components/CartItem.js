import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function CartItem(props) {
  const { item } = props;

  return (
    <div className="product">
      <img src={item.imageUrl} alt={item.title}/>
      <div className="product-info">
        <Text isHeader={true} text={item.title} />
        <Text isHeader={false} text={`Quantity: ${item.quantity}`} />  
        <Text isHeader={false} text={item.description} />
        <Text isHeader={false} text={item.price} />
        <button onClick= {() => props.deleteFromCart(item.id)}>Remove from cart</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }),

    deleteFromCart: PropTypes.func.isRequired,
};