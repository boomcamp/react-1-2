import React, { Component } from 'react';
import './App.css';

import Product from './components/Product';
import CartItem from './components/CartItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      cardView: true,
      search: '',
      pageView: true,
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0
        },
      ],
    };

    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  // addToCart = item => {
    // this.setState({
    //   cart: [...this.state.cart, item],
    // });
  addToCart(item) {
    let cartItem = this.state.cart.map(product => Object.assign({}, product));
    let i = this.state.cart.findIndex(product => product.id === item.id);

    if(i < 0){
      item = Object.assign({}, item, { quantity: 1 });
      this.setState({ cart: [...this.state.cart, item] });
    }
    else {
      cartItem[i].quantity++;
      this.setState({ cart: cartItem });
    }
  };

  deleteFromCart(id) {
    let cartItem = this.state.cart.map(product => Object.assign({}, product));
    let i = this.state.cart.findIndex(product => product.id === id); 

    if(cartItem[i].quantity === 1){
      cartItem.splice(i, 1);
    }
    else if(cartItem[i].quantity > 1){
      cartItem[i].quantity--;
    }

    this.setState({
      cart: cartItem
    });
    // this.setState({ 
    //   cart: [...this.state.cart, id] });
  }

  checkout = () => {
    if(this.state.cart.length > 0){
      this.setState({ cart: [] });
      alert('Purchase is complete!');
    }
    else {
      alert('Please add products to cart first.');
    }
  };

  handleSearch(value) {
    this.setState({ search: value });
  }

  handleToggleView = () => {
    this.setState({ cardView: !this.state.cardView });
  };

  handleTogglePage = () => {
    this.setState({ pageView: !this.state.pageView });
  };

  render() {
    return (
      <div className="App">
        <nav className={this.state.pageView ? 'black' : 'grey' } >
          <button onClick={() => this.handleTogglePage()}>Change Page</button>
        </nav>
        {this.state.pageView ? (
        <section className="products">
          <h1>Products</h1>
          <label>
            Search:
              <input className="search" value={this.state.search} onChange={(e) => this.handleSearch(e.target.value)}/>
          </label>
          <br /><br />
          <button className="toggle" onClick={this.handleToggleView}>Toggle View</button>
          <h2>Hats</h2>
          {this.state.hats.map(item => {
            if(this.state.search){
              if(item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return (
                  <Product 
                    key={item.id}
                    item={item}
                    addToCart={this.addToCart} 
                    view={this.state.cardView}
                  />
                )
              }
            }
            else {
              return (
                <Product 
                  key={item.id}
                  item={item}
                  addToCart={this.addToCart}
                  view={this.state.cardView} 
                />
              )
            }
            
          })}

          <h2>Beach Gear</h2>
          {this.state.beachGear.map(item => {
            if(this.state.search){
              // var t = item.title.toLowerCase();
              if(item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return (
                  <Product 
                    key={item.id}
                    item={item}
                    addToCart={this.addToCart}
                    view={this.state.cardView} 
                  />
                )
              }
            }
            else {
              return (
                <Product 
                  key={item.id}
                  item={item}
                  addToCart={this.addToCart}
                  view={this.state.cardView} 
                />
              )
            }
          })}       
        </section>
        )
        : (
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += (product.price * product.quantity) ),
              0
            )}
          </h2>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem  
              key={item.id}
              item={item}
              deleteFromCart={this.deleteFromCart}
            />
          ))}
        </section>
        )}
      </div>
    );
  }
}
