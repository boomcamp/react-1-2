import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function Product(props) {
  const { item} = props;

  return (
    <div className={props.cardView ? "product" : "product-list"}>
      <img src={item.imageUrl} alt={item.title}/>
      <div className="product-info">
        <Text isHeader={true} text={item.title} />
        <Text isHeader={false} text={item.description} />
        <Text isHeader={false} text={item.price} />
        <button onClick={() => props.addToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

Product.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    addToCart: PropTypes.func.isRequired,
  };

  