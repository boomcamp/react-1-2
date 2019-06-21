import React, { Component } from 'react';
import './App.css';

import Product from './components/Product';
import CartItem from './components/CartItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: true,
      toggleView: true,
      cart: [],
      search: '',
      address:'',
      creditCard:'',
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          qty: 0,
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
        {
          id: 2,
          title: 'Metal Hat',
          qty: 0,
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          qty: 0,
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://via.placeholder.com/150x150',
        },
      ],
    };
    this.deleteFromCart = this.deleteFromCart.bind(this)
  }

  addToCart= item => {
    let cartNew = this.state.cart.map(prod => Object.assign({}, prod));
    var idx = this.state.cart.findIndex(prod => prod.id === item.id)

    if (idx === -1) {
      item = Object.assign({}, item, { qty: 1 })
      this.setState({
        cart: [...this.state.cart, item]
      })
    }else {
      cartNew[idx].qty++
      this.setState({
        cart: cartNew
      })
    }
  }

  checkout = () => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0 ) {
      this.setState({ cart: [], address: '', creditCard: '' });
      alert('Purchase is complete!');
    } else {
      alert('Please fill out the required fields.');
    }
  };

  deleteFromCart(id){
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === id);

    if (cartCopy[index].qty === 1) {
      cartCopy.splice(index, 1);
    } else if (cartCopy[index].qty > 1) {
      cartCopy[index].qty--;
    }

    this.setState({ cart: cartCopy });
  }

  handleToggleView= () => {
    this.setState({
      toggleView: !this.state.toggleView
    })
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  handleView = () => {
    this.setState({
      view: !this.state.view
    })
  }

  handleAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  handleCreditCard = e => {
    this.setState({
      creditCard: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
         

          {this.state.view ? 
          <section className="products">  
          <nav className={this.state.view ? "black":"grey"}>
            <button onClick={()=>this.handleView()}>Toggle View</button>
          </nav>

            <h1>Products</h1>
            <input placeholder="Search" value={this.state.search} onChange={this.handleSearch}/><br/><br/>
            <button onClick={() => this.handleToggleView()}>Toggle View</button>

          <h2>Hats</h2>
          {this.state.hats.map(item => {
            if(this.state.search){
              if(item.title.includes(this.state.search)){
                return (
                  <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.toggleView}/>
                )
              }else{
                return
              }
              
            }
            
            return (
              <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.toggleView}/>
            )
          })}

          <h2>Beach Gear</h2>
          {this.state.beachGear.map(item => {
            if(this.state.search){
              if(item.title.toLowerCase() == this.state.search.toLowerCase()){
                return (
                  <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.toggleView}/>
                )
              }else{
                return
              }
              
            }
            
            return (
              <Product key={item.id} item={item} addToCart={this.addToCart} handleToggleView={this.state.toggleView}/>
            )
            })}
        </section> 
            
          :
            
          <section className="cart">
            <nav className={this.state.view ? "black":"grey"}>
            <button onClick={()=>this.handleView()}>Toggle View</button>
          </nav>

          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price * product.qty),
              0
            )}
          </h2>
          <input placeholder="Address" value={this.state.address} onChange={this.handleAddress} />
          &nbsp;
          <input placeholder="Credit Card" value={this.state.creditCard} onChange={this.handleCreditCard} /><br/>
          <button onClick={this.checkout}>Checkout</button>

          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart}/>
          ))}
          </section>
           
          }
          


        
      </div>
    );
  }
}
