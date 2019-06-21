import React from 'react';

export default function Product(props) {
  const { item, addToCart, isEnabled } = props;

  return (
    <div className="product" style={{flexDirection:isEnabled?'column':'row'}}>
      <img src={item.imageUrl} />
      <div className="product-info">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <button onClick={() => addToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
}
