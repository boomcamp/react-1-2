import React from 'react';

export default function CartItem(props) {
    const { item } = props;

    return (
        <div class="product">
            <img src={item.imageUrl} />
            <div className="product-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>{item.price}</p>
            </div>
        </div>
    );
}