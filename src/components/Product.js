import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function Product(props) {
    const { item, addToCartFn, cardView} = props;
    const { id, imageUrl, title, description, price } = item;

    return (
        <div className={cardView ? "product" : "product-list"}>
            <img src={imageUrl}></img>
            <div>
                <Text isHeader={true} text={title} />
                <Text isHeader={false} text={description} />
                <Text isHeader={false} text={price} />
                <button onClick={() => addToCartFn(item)}>Add to Cart</button>
            </div>
        </div>
    )
}

Product.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    addToCartFn: PropTypes.func.isRequired,
    cardView: PropTypes.bool.isRequired,
  };