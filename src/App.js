import React, { Component } from 'react';
import './App.css';
import Product from "./components/Product";
import CartItem from "./components/CartItem";

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
      cardView: true,
      mainView: true,
    };

  }
  addToCart= item => {
    let obj = Object.assign({});
    let cartCopy = this.state.cart.map(product => (obj, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if (index === -1) {
      item = Object.assign({}, item, { quantity: 1 });
     
      this.setState({ cart: [...this.state.cart, item] });
     // console.log({ cart: [...this.state.cart, item] });
    } else {
      cartCopy[index].quantity++;
      this.setState({ cart: cartCopy });
    }
  }
  deleteFromCart = id => {
    let obj = Object.assign({});
    let cartCopy = this.state.cart.map(product => (obj, product));
    let index = this.state.cart.findIndex(product => product.id === id);

    if (cartCopy[index].quantity === 1) {
      cartCopy.splice(index, 1);
    } else if (cartCopy[index].quantity > 1) {
      cartCopy[index].quantity--;
    }

    this.setState({ cart: cartCopy });
  };

  checkout = () => {
      this.setState({ cart: [] });
      alert('Purchase is complete!');
  };

  handleToggleView = () => {
    this.setState({
      cardView: !this.state.cardView,
    })
    
  }

  handleTogglePage = () => {
    this.setState({ mainView: !this.state.mainView });
  };


  render() {
    return (
      <div className="App">
           <nav className={this.state.mainView ? "black" : "grey"}>
          <button onClick={() => this.handleTogglePage()}>Change Page</button>
        </nav>
    
    {this.state.mainView ? (
        <section className="products">
        <button onClick = {this.handleToggleView} >Toggle View</button>
  <h1>Products</h1>
  <h2>Hats</h2>
  {this.state.hats.map(item => (
    <Product key={item.id} item={item} addToCart={this.addToCart} cardView = {this.state.cardView} />
  ))}

  <h2>Beach Gear</h2>
  {this.state.beachGear.map(item => (
    <Product key={item.id} item={item} addToCart={this.addToCart} cardView = {this.state.cardView} />
  ))}
</section>
) : 
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price * product.quantity),
              0
            )}
          </h2>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCart = {this.deleteFromCart} />
          ))}
        </section>

          }
          
        </div>
  
    );
  }
}
