import React, { Component } from 'react';
import './App.css';

import Product from './components/Product';
import CartItem from './components/CartItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      main: true,
      toggle: true,
      address: '',
      ccard: '',
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
      bikeItems: [
        {
          id: 4,
          title: 'Spyder Helmet',
          description: 'Very nice helmet',
          price: 399.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0,
        },
        {
          id: 5,
          title: 'Deore XT GroupSet',
          description: 'Deore groupset 1x11',
          price: 399.99,
          imageUrl: 'https://via.placeholder.com/150x150',
          quantity: 0,
        }
      ]
    };
  }

  addToCart =item => {
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

  checkout = () => {
    if ((this.state.address != '')&&(this.state.ccard != '')){
      if  (this.state.cart == '') {
        alert('you dont nothing to buy');
     }else {
      this.setState({ cart: [] });
      alert('Purchase is complete!');}
      this.state.address = '';
      this.state.ccard = '';
    } else {
      alert('please fillup details');
    }
  };

  
  removeFromCart = (id) => {
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === id);

    if (cartCopy[index].quantity === 1) {
      cartCopy.splice(index, 1);
    } else if (cartCopy[index].quantity > 1) {
      cartCopy[index].quantity--;
    }

    this.setState({ cart: cartCopy });
  }

  handleToggleView = () => {
    this.setState({toggle: !this.state.toggle});
  }
  handlePage = () => {
    this.setState({main: !this.state.main});
  }
  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleAdd = (e) => {
    this.setState({
      address: e.target.value
    })
  }
  handleCcard = (e) => {
    this.setState({
      ccard: e.target.value
    })
  }

  render() {
    return (
    <div className="App">
        <nav className={this.state.main? "black" : "grey"}>
          <button onClick={() => this.handlePage()}>Change Page</button>
        </nav>

      {this.state.main? (
      <section className="products">
        <label>Seach: </label><input onChange={(e)=> this.handleSearch(e)} type="text" placeholder="find product"></input>  
          <button onClick={()=> this.handleToggleView()}>Togge View</button>
          <h2>Hats</h2>
          {
            this.state.hats.map(item => {
              if (this.state.search) {
                if (item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                  return (
                    <Product key={item.id} item={item} addToCart={this.addToCart} toggle={this.state.toggle} />
                  )
                } else {
                  return
                }
              }
              return (
                <Product key={item.id} item={item} addToCart={this.addToCart} toggle={this.state.toggle}  />
              )
            })
          }
          <h2>Beach Gear</h2>
          {
            this.state.beachGear.map(item => {
              if (this.state.search) {
                if (item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                  return (
                    <Product key={item.id} item={item} addToCart={this.addToCart} />
                  )
                } else {
                  return
                }
              }
              return (
                <Product key={item.id} item={item} addToCart={this.addToCart} />
              )
            })
          }

          <h2>Bike Gear</h2>
          {
            this.state.bikeItems.map(item => {
              if(this.state.search) {
                if(item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                  return (
                    <Product key={item.id} item={item} addToCart={this.addToCart} />
                  )
                }else {
                  return
                }
              }
              return (
                <Product key={item.id} item={item} addToCart={this.addToCart} />
              )
            })
          }

      
      </section>
      ) : (
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price),
              0
            )}
          </h2>
          <div className="inputs">
            <input type="text" value={this.state.address} placeholder="address" onChange={(e)=> this.handleAdd(e)}></input>
            <input type="text" value={this.state.ccard} placeholder="credit-card" onChange={(e)=> this.handleCcard(e)} ></input>
          </div>
          <button onClick={this.checkout}>Checkout</button>
          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} removeFromCart={this.removeFromCart} />
            ))}
        </section>
      )}
      </div>
    );
  }
}
