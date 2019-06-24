import React, { Component } from 'react';
import './App.css';

import Product from './components/Product';
import CartItem from './components/CartItem';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      address: "",
      creditCard: "",
      cardView : true,
      defaultPage : true,
      search : "",
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
    let copyCart = [...this.state.cart];
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if(index === -1) {
      item = Object.assign({}, item, {quantity: 1})
      this.setState({
        cart: [...this.state.cart, item],
      });
    } else {
      copyCart[index].quantity++;
      this.setState({
        cart : copyCart,
      });
    }
  }

  deleteFromCart = (id) => {
    let copyCart = [...this.state.cart];
    let index = this.state.cart.findIndex(product => product.id === id);

    if(copyCart[index].quantity === 1) {
      console.log(copyCart[index].quantity);
      copyCart = copyCart.filter(product => product.id !== copyCart[index].id);
    } else {
      copyCart[index].quantity -= 1;
    }

    this.setState({
      cart: copyCart,
    });
  }

  checkout = () => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
      this.setState({ cart: [] });
      alert('Purchase is complete!');
    } else {
      alert('Please fill out the required fields.')
    }
  };

  handleAddressInput = (e) => {
    this.setState({ address: e.target.value });
  }

  handleCreditCardInput = (e) => {
    this.setState({ creditCard: e.target.value });
  }

  handleToggleView = () => {
    this.setState({
      cardView : !this.state.cardView,
    })
  }

  search = (input) => {
    this.setState({
      search: input,
    })
  }

  handleTogglePage = () => {
    this.setState({
      defaultPage : !this.state.defaultPage,
    })
  }

  render() {

    return (
      <div className="App">
        <nav className={this.state.defaultPage ? ("navbar black") : ("navbar grey")}>
          <button onClick={this.handleTogglePage}>Change Page</button>
        </nav>

        { this.state.defaultPage ? 
        (<section className="products">
          <h1>Products</h1>
          <label>Search : <input placeholder="Search" onChange={e => this.search(e.target.value)}/></label>
          <br></br><br></br>
          <button onClick={this.handleToggleView}>Toggle View</button>
          <h2>Hats</h2>
          {this.state.hats.map(item => {
            if (this.state.search) {
              if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                return (<Product key={item.id}
                  item = {item}
                  addToCart = {this.addToCart}
                  cardView = {this.state.cardView}
                />)
              }
            } else {
              return (<Product key={item.id}
                item = {item}
                addToCart = {this.addToCart}
                cardView = {this.state.cardView}
              />)
            }
          })}

          <h2>Beach Gear</h2>
          {this.state.beachGear.map(item => {
            if (this.state.search) {
              if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                return (<Product key={item.id}
                  item = {item}
                  addToCart = {this.addToCart}
                  cardView = {this.state.cardView}
                />)
              }
            } else {
              return (<Product key={item.id}
                item = {item}
                addToCart = {this.addToCart}
                cardView = {this.state.cardView}
              />)
            }
          })}
        </section>)

        :

        (<section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += (product.price  * product.quantity)),
              0
            )}
          </h2>

          <div className="inputs">
            <input placeholder="address" value={this.state.address} onChange={this.handleAddressInput} />
            <input placeholder="credit card number" value={this.state.creditCard} onChange={this.handleCreditCardInput} />
          </div>

          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} 
              item = {item}
              deleteFromCartFn = {this.deleteFromCart}
            />
          ))}
          </section>)
        }
      </div>
    );
  }
}
