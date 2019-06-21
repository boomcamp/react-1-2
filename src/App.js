import React, { Component } from 'react';
import './App.css';

import Product from './components/Product';
import CartItem from './components/CartItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cardView: true,
      pageView: true,
      searchVal : '',
      cart: [],
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
      ],
    };
  }

  addToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item],
    });
  }

  checkout = () => {
    this.setState({ cart: [] });
    alert('Purchase is complete!');
  };

  deleteFromCart = id => {
    var cartCopy = this.state.cart.filter(item => item.id!==id);
    this.setState({
      cart: cartCopy
    })
  }

  handleToggleView= () => {
    this.setState({
      cardView: !this.state.cardView
    })
    console.log(this.state.cardView)

  }
  handleSearchInput = (val) => {
    this.setState({
      searchVal: val
    })
  }

  handleTogglePage = () => {
    this.setState({
      pageView: !this.state.pageView
    })
  }

  render() {
    return (
      <div className="App">
        <nav className={this.state.pageView ? "black" : "white"}>
          <button onClick={this.handleTogglePage}>Change Page</button>
        </nav>
        {this.state.pageView ?
        <section className="products">
          <h1>Products</h1>
          <div>Search: 
            <input onChange={(e) => this.handleSearchInput(e.target.value)} />
          </div>
          
          <button onClick={this.handleToggleView}>Toggle View</button>
          <h2>Hats</h2>
          {this.state.hats.map(item => (
            item.title.match(new RegExp(this.state.searchVal, 'gi')) && <Product key={item.id} item={item} addToCart={this.addToCart} cardView={this.state.cardView} /> 
          ))}

          <h2>Beach Gear</h2>
          {this.state.beachGear.map(item => (
            item.title.match(new RegExp(this.state.searchVal, 'gi')) && <Product key={item.id} item={item} addToCart={this.addToCart} cardView={this.state.cardView} />
          ))}
        </section>
            :
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price),
              0
            )}
          </h2>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFn={this.deleteFromCart}/>
          ))}
        </section>
        }
      </div>
      
    );
  }
}
