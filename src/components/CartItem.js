import React from 'react';
import Text from './Text';
import PropTypes from 'prop-types';

export default function CartItem(props){
    const {item, removeFromCart} = props;

    
    return (
        <div className="product">
            <img alt="gun" src={item.imageUrl} />
            <div className="product-info">
                <Text isHeader={true} text={item.title} />
                <Text isHeader={false} text={item.description} />
                <Text isHeader={false} text={item.price}/>
                <Text isHeader={false} text={item.quantity} />
            </div>
            <button onClick={()=> removeFromCart(item.id)}>I don't want this</button>
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
    })
}