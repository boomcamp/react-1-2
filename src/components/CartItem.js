import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function CartItem(props){
    return (
        props.items.map( item => {
            return(
                <div key={item.id} className="product">
                <img src={item.imageUrl} />
                <div className="product-info">
                    <p>{item.quantity}</p>
                    <Text isHeader={true} text={item.title}/>
                    <Text isHeader={false} text={item.description} />
                    <Text isHeader={false} text={item.price}/>
                </div>
                <button onClick={() => props.deleteFromCart(item)}>Remove from Cart</button>
                </div>
            )
        })
    )     
}

// Proptypes
CartItem.propTypes = {
    items: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    addToCart: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
  };