import React from 'react';
import Text from './Text';

export default function CartItem(props) {
  const { item, deleteFromCart } = props;

  return (
    <div className="product">
      <img src={item.imageUrl} />
      <div className="product-info">
        <Text isHeader text={item.title} />
        <Text isHeader={false} text={item.description} />
        <Text isHeader={false} text={item.price} />
        <Text text={item.quantity}/>
        <button onClick={() => deleteFromCart(item.id)}>Remove from Cart</button>
      </div>
    </div>
  );
}
