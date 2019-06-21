import React from 'react'
import PropTypes from 'prop-types'
import Text from './Text'

export default function CartItem (props){
	return (
		<div className='product'>
			<img src={props.item.imageUrl} alt=''/>
			<div className='product-info'>
				<Text isHeader={true} text={props.item.title}/>
        <Text isHeader={false} text={props.item.description}/>
				<Text isHeader={false} text={props.item.quantity}/>
        <Text isHeader={false} text={props.item.price}/>
				<button onClick={() => props.deleteFromCartFn(props.item.id)}>remove</button>
			</div>
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
	}),
	deleteFromCartFn: PropTypes.func.isRequired,
}

