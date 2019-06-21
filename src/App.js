import React, { Component } from 'react';
import Product from "./components/Product";
import CartItem from "./components/CartItem";
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cardView: true,
      pageView: true,
      cart: [],
      address: "",
      creditCard: "",
      searchText: "",
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

  addToCart = item => {
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

  deleteFromCart = id => {
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let idx = this.state.cart.findIndex(product => product.id === id);

    if(cartCopy[idx].quantity === 1) {
        cartCopy.splice(idx, 1);
    } else if (cartCopy[idx].quantity > 1) {
        cartCopy[idx].quantity--;
    }
    this.setState({ cart: cartCopy });
}


  checkout = () => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
        this.setState({ cart: [] });
        alert('Purchase is complete');
    } else {
        alert('Please fill out the required fields.');
    }
  };

  handleAddressInput = e => {
    this.setState({ address: e.target.value });
  }

  handleCreditCardInput = e => {
      this.setState({ creditCard: e.target.value });
  }

  handleToggleView = () => {
   
    if(this.state.cardView === true){
        this.setState({ cardView: false});
    }
    else{
        this.setState({ cardView: true});
    }
    console.log(this.state.cardView);
  }

  handleTogglePage = () => {
      this.setState({ pageView: !this.state.pageView});
  }
  
  handleSearchInput = e => {
    this.setState({ searched: e.target.value });
  }
  // findProduct = (name) {
  //   if(name)
  // }
  render() {
    return (
      <div className="App">
        <nav className = {this.state.pageView ? "black" : "grey"}>
          <button onClick={() => this.handleTogglePage()}className="changepage">Change Page</button>
        </nav>

        {this.state.pageView ? (
          <section className="products">
            <h1>Products</h1>
            <button onClick={this.handleToggleView}>Toggle View</button><br/><br/>
            <label>Search Products:
              <input
                placeholder="Search"
                value = {this.state.searched}
                onChange = {this.handleSearchInput}
              />
            </label>
            <h2>Hats</h2>
            {this.state.hats.map(item => (
              <Product key={item.id} item={item} addToCart={this.addToCart} cardView = {this.state.cardView}/>
            ))}

            <h2>Beach Gear</h2>
            {this.state.beachGear.map(item => (
              <Product key={item.id} item={item} addToCart={this.addToCart} cardView = {this.state.cardView}/>
            ))}
          </section>
        )
        : (
          <section className="cart">
            <h1>Cart</h1>
            <h2>
              Total: $
              {this.state.cart.reduce(
                (totalPrice, product) => (totalPrice += product.price * product.quantity),
                0
              )}
            </h2>
            <div>
                <input 
                    placeholder="address"
                    value = {this.state.address}
                    onChange = {this.handleAddressInput}
                />
                <input 
                    placeholder="credit card number"
                    value = {this.state.creditCard}
                    onChange = {this.handleCreditCardInput}
                />
            </div>
            <button onClick={this.checkout}>Checkout</button>
            {this.state.cart.map(item => (
              <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart}/>
            ))}
          </section>
        )}
      </div>
    );
  }
}