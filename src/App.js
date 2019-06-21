import React, { Component } from 'react';
import './App.css';

import Product from './components/Product'

import CartItem from './components/CartItem'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      address:'',
      creditCard:'',
      cart: [],
      searchQuery:'',
      enableToggle:false,
      changePage:true,
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity:0
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity:0
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity:0
        },
      ],
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addToCart(item) {
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if (index === -1) {
      item = Object.assign({}, item, { quantity: 1 });
      this.setState({ cart: [...this.state.cart, item] });
    } else {
      cartCopy[index].quantity++;
      this.setState({ cart: cartCopy });
    }
  }

  deleteFromCart(id) {
   let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === id);

    if (cartCopy[index].quantity === 1) {
      cartCopy.splice(index, 1);
    } else if (cartCopy[index].quantity > 1) {
      cartCopy[index].quantity--;
    }

    this.setState({ cart: cartCopy });
  }

  checkout = () => {
     if(this.state.cart.length > 0) {
      if (this.state.address.length > 0 && this.state.creditCard.length > 0 ) {
      this.setState({ cart: [] });
      alert("Purchase is complete!");
      this.setState({address : ''})
      this.setState({creditCard : ''})
      } else {
      alert("Please fill out the required fields.");
      }
    } else {
      alert('The cart is empty');
    }
  };
  handleChange(e) {
    this.setState({
      searchQuery:e.target.value
    })
  }

  render() {

      let regex=this.state.searchQuery;
      const {enableToggle, changePage} = this.state;
    return (
      <div>
        <section className="headerbtn">
        <button className="changer" onClick={()=>{this.setState({changePage:!changePage})}}>Change page</button>
        </section>
      <div className="App">
        <section className="products" style={{display: changePage?'block':'none'}}>
          <h1>Products</h1>
          <input onChange={this.handleChange} placeholder="Search..." className="search_bar"/>
          <h2>Hats</h2>
          <button onClick={()=>{this.setState({enableToggle:!enableToggle})}}>ToggleView</button>
          {this.state.hats.filter(item => item.title.toLowerCase().match(regex.toLowerCase())).map(item => (
           <Product key={item.id} item={item} addToCart={this.addToCart} isEnabled={enableToggle}/>
          ))}

          <h2>Beach Gear</h2>
          {this.state.beachGear.filter(item => item.title.toLowerCase().match(this.state.searchQuery.toLowerCase())).map(item => (
            <Product key={item.id} item={item} addToCart={this.addToCart} isEnabled={enableToggle} />
          ))}
        </section>

        <section className="cart" style={{display: !changePage?'block':'none'}}>
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price),
              0
            ).toFixed(2)}

          </h2>
            <div className="inputs">
            <input
              placeholder="address"
              value={this.state.address}
              onChange={(e) => {this.setState({address: e.target.value})}}
            />
            <input
              placeholder="credit card number"
              value={this.state.creditCard}
              onChange={(e) => {this.setState({creditCard: e.target.value})}}
            />
          </div>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart}  />
          ))}
        </section>
      </div>
      </div>
    );
  }
}
