import React, { Component } from 'react';
import './App.css';
import Product from './components/Product'
import CartItem from './components/CartItem'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cardView: true,
      changePage: true,
      searchVal: '',
      regex: '',
      address: '',
			creditCard: '',
      cart: [],
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0,
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0,
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0,
        },
      ],
    };
  }

  addToCart = (item) => {
		let cartCopy = this.state.cart.map(product => Object.assign({}, product));
		console.log(cartCopy)
		let i = this.state.cart.findIndex(ite => ite.id === item.id)
		console.log(i);
		if(i === -1){
			item.quantity = 1;
			this.setState({
				cart: this.state.cart.concat(item)
			})
		}
		else{
			cartCopy[i].quantity++;
      		this.setState({ cart: cartCopy });
		}
	}

  checkout = () => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
		  this.setState({ cart: [] });
		  alert('Purchase is complete!');
		} else {
		  alert('Please fill out the required fields.');
		}
  };

  handleAddressInput = (e) => {
		this.setState({address: e.target.value})
	}

	handleCreditCardInput = (e) => {
		this.setState({creditCard: e.target.value})
  }

  deleteFromCart = (id) => {
    let cartCopy = this.state.cart.filter(item => id !== item.id)
    this.setState({
      cart: cartCopy
    })
  }

  handleToggleView = () => { 
    if(this.state.cardView){
      this.setState({cardView: false})
    } else {
      this.setState({cardView: true})
    }
  }

  searchBar = (e) => {
    this.setState({searchVal: e.target.value, regex: new RegExp(e.target.value, 'gi')})
    console.log(this.state.regex);
  }
  
  handleChangePage = () =>{
    this.state.changePage ? this.setState({changePage : false}) : this.setState({changePage : true})
  }

  render() {
    return (
      <div className="App">
        <nav className={this.state.changePage ? 'black' : 'grey'}>
          <button onClick={this.handleChangePage}>Change Page</button>  
        </nav>
        {this.state.changePage ? 
        <section className="products">
          <h1>Products</h1>
          <div> Search:
            <input onChange={e => this.searchBar(e)} />
          </div>
          <button onClick={() => this.handleToggleView()}>Toggle View</button>
          <h2>Hats</h2>
          {this.state.hats.map(item => (
            item.title.match(this.state.regex) && <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.cardView}/>
          ))}

          <h2>Beach Gear</h2>
          {this.state.beachGear.map(item => (
            item.title.match(this.state.regex) && <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.cardView}/>
          ))}
        </section>
        :
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price * product.quantity),
              0
            )}
          </h2>
          <div className='input'>
						<input
							placeholder='address'
							value={this.state.address}
							onChange={this.handleAddressInput}
						/>
						<input
							placeholder='credit card number'
							value={this.state.creditCard}
							onChange={this.handleCreditCardInput}
						/>
					</div>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCartFn={this.deleteFromCart}/>
          ))}
        </section>
        }
      </div>
    );
  }
}
