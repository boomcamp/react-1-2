import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function CartItem(props) {
  const { item, deleteFromCartFn } = props;
  return (
    <div className="product">
      <img src={item.imageUrl} alt='productImage'/>
      <div className="product-info">
        <Text isHeader={true} text={item.title} />
        <Text isHeader={false} text={item.description} />
        <Text isHeader={false} text={item.price} />
        <Text isHeader={false} text={item.quantity} />
        <button onClick={() => deleteFromCartFn(item.id)}> Remove from Cart </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item : PropTypes.shape({
    id : PropTypes.number.isRequired,
    imageUrl : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    quantity : PropTypes.number.isRequired,
  }),
  deleteFromCartFn : PropTypes.func.isRequired,
};
