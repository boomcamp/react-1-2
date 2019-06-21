import React from 'react';

export default function CartItem(props) {
  const { item } = props;

  return (
    <div class="product">
      <img src={item.imageUrl} height="180" width="200"/>
      <div className="product-info">
        <h4>{item.title}</h4>
        <p>{item.price}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
}