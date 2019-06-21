import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

export default function Product(props){
    return (

            props.products.map(prod => {
                if(props.setText){
                    if(prod.title.toLowerCase().includes(props.setText)){
                        return (
                            <div key={prod.id} className={props.cardView ? "product" : "product-list"}>
                            <img src={prod.imageUrl} alt=""/>
                            <div className="product-info">
                                <Text isHeader={true} text={prod.title}/>
                                <Text isHeader={false} text={prod.description}/>
                                <Text isHeader={false} text={prod.price}/>
                                <button onClick={() => props.addToCart(prod)}> Add to cart </button>
                            </div>   
                        </div>
                        )   
                    }
                }
                else{
                    return (
                        <div key={prod.id} className={props.cardView ? "product" : "product-list"}>
                        <img src={prod.imageUrl} alt=""/>
                        <div className="product-info">
                            <Text isHeader={true} text={prod.title}/>
                            <Text isHeader={false} text={prod.description}/>
                            <Text isHeader={false} text={prod.price}/>
                            <button onClick={() => props.addToCart(prod)}> Add to cart </button>
                            <p>{props.setText}</p>
                        </div>   
                    </div>
                    ) 
                }
                
                                  
                
            })

    )
}

// Proptypes
Product.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    addToCart: PropTypes.func.isRequired,
    handleToggleView: PropTypes.func.isRequired,
  };