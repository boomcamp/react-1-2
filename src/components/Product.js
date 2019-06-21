import React from 'react';
import PropTypes from 'prop-types';

export default function Product(props) {
  const { item, addToCart } = props;

  return (
    <div class="product">
      <img src={item.imageUrl} height="180" width="200" />
      <div className="product-info">
        <h4>{item.title}</h4>
        <p>{item.price}</p>
        <p>{item.description}</p>
        <button onClick={() => addToCart(item)}>Add to Cart</button>
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
};