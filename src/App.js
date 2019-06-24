import React, { Component } from 'react';
import Product from './components/Product';
import CartItem from './components/CartItem';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 1,
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 1,
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 1,
        },
      ],
      toggleView: true,
      toggleSide: true,
      address: '',
      credit: '',
      search: '',
    };
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  toggleView = () => {
    this.setState({
      toggleView: !this.state.toggleView,
    });
  }

  addToCart = item => {
    let temp = this.state.cart.map(e => Object.assign({}, e));
    let index = this.state.cart.findIndex(e => e.id === item.id);

    if (index === -1) {
      item = Object.assign({}, item, { quantity: 1 });
      this.setState({ cart: [...this.state.cart, item] });
    } else {
      temp[index].quantity++;
      this.setState({ cart: temp });
    }
  }

  checkout = () => {
    const {address, credit} = this.state;
    if(address != '' && credit != '') {
      this.setState({ cart: [] });
      alert('Purchase is complete!');
    } else {
      alert('Please fill out the required fields!');
    }
  };

  toggleSide = () => {
    this.setState({
      toggleSide: !this.state.toggleSide,
    });
  }

  deleteFromCart = (id) => {
    let temp = this.state.cart.map(e => Object.assign({}, e));
    let index = this.state.cart.findIndex(e => e.id === id);

    if (temp[index].quantity === 1) {
      temp.splice(index, 1);
    } else if (temp[index].quantity > 1) {
      temp[index].quantity--;
    }

    this.setState({ cart: temp });
  }


  render() {
    return (
      <div className={this.state.toggleSide ? "App active" : "App disabled"}>
        <nav>
          <button onClick={() => this.toggleSide()}>Change Page</button>
        </nav>
        {this.state.toggleSide ?
          (
            <section className="products">
              <h1>Products</h1>
              <label>Search:</label><input onChange={e => this.setState({
                search: e.target.value,
              })} type="text" />
              <br/>
              <button onClick={() => this.toggleView()}>Toggle View</button>
              <h2>Hats</h2>
              {this.state.hats.map(item => {
                if(this.state.search) {
                  if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return (
                      <Product key={item.id} item={item} view={this.state.toggleView} addToCart={this.addToCart} />
                    )
                  } else {
                    return
                  }
                }
                return (
                  <Product key={item.id} item={item} view={this.state.toggleView} addToCart={this.addToCart} />
                )
              })}

              <h2>Beach Gear</h2>
              {this.state.beachGear.map(item => {
                if(this.state.search) {
                  if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return (
                      <Product key={item.id} item={item} view={this.state.toggleView} addToCart={this.addToCart} />
                    )
                  } else {
                    return
                  }
                }
                return (
                  <Product key={item.id} item={item} view={this.state.toggleView} addToCart={this.addToCart} />
                )
                })}
            </section>
          )
          :
          (
            <section className="cart">
              <h1>Cart</h1>
              <h2>
                Total: $
                {this.state.cart
                  .reduce(
                    (totalPrice, product) =>
                      (totalPrice += product.price * product.quantity),
                    0
                  )
                  .toFixed(2)}
              </h2>
              <div className="inputs">
                <input
                  placeholder="address"
                  value={this.state.address}
                  onChange={e => this.setState({
                    address: e.target.value,
                  })}
                />
                <input
                  placeholder="credit card number"
                  value={this.state.credit}
                  onChange={e => this.setState({
                    credit: e.target.value,
                  })}
                />
              </div>
              <button onClick={this.checkout}>Checkout</button>
              {this.state.cart.map(item => (
                <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart} />
              ))}
            </section>
          )
        }
      </div>
    );
  }
}
/*
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
            <CartItem key={item.id} item={item} />
          ))}
        </section>


*/
