import React, { Component } from 'react';
import Product from './components/Product';
import CartItem from './components/CartItem';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      address: '',
      creditCard: '',
      searchThis: '',
      Toggler: false,
      ChangePage: true,
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            'Headgear commonly used by fishermen. Increases fishing skill marginally.',
          price: 12.99,
          imageUrl: 'https://www.boutique-augustin.com/630-thickbox/fisherman-s-hat-.jpg',
          quantity: 0
        },
        {
          id: 2,
          title: 'Metal Hat',
          description: 'Uncomfortable, but sturdy.',
          price: 8.99,
          imageUrl: 'https://ui-ex.com/images/hat-transparent-medieval-3.png',
          quantity: 0
        },
      ],
      beachGear: [
        {
          id: 3,
          title: 'Tent',
          description: 'Portable shelter.',
          price: 32.99,
          imageUrl: 'https://www.sccpre.cat/mypng/detail/17-170699_campsite-png-free-icons-transparent-background-tent.png',
          quantity: 0
        },
      ],
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.searchItem = this.searchItem.bind(this);
  }

  addToCart(item) {
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);

    this.state.hats.map(cart => {

    });

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
    if (this.state.cart.length == 0) {
    alert('Empty Cart');
  }else if(this.state.address.length <= 0  && this.state.creditCard.length > 0){
    alert('Enter your address');
  }else if(this.state.creditCard.length <= 0 && this.state.address.length > 0){
    alert('Enter your credit card number');
  }else if(this.state.address.length > 0 && this.state.creditCard.length > 0) {
    this.setState({ address: '' });
    this.setState({ creditCard: '' }); 
    this.setState({ cart: [] });     
    alert('Purchase is complete!');
    
  }else{
    alert('Fill out required fields');
  }
  };

  searchItem(search){
    this.setState({ 
      searchThis: search.target.value
    });
  }



  render() {
    const{Toggler, ChangePage} = this.state;
    return (
      <div>
      <div className="header">
        <button onClick={() => {this.setState({ChangePage: !ChangePage})}}>Change Page</button>
      </div>
      <div className="App">
        <section className="products" style={{display: ChangePage?'block':'none'}}>
          <h1>Products</h1>
            <input type="text" placeholder="Search item here..." className="input-search" onChange={this.searchItem} />            
          <h2>Hats</h2>          
          <button onClick={() => {this.setState({Toggler: !Toggler})}}>Toggle View</button>
          {this.state.hats.filter(item => item.title.toLowerCase().match(this.state.searchThis.toLowerCase())).map(item => (
            <Product key={item.id} item={item} addToCart={this.addToCart} toggle={Toggler} />
          ))}

          <h2>Beach Gear</h2>
          {this.state.beachGear.filter(item => item.title.toLowerCase().match(this.state.searchThis.toLowerCase())).map(item => (
            <Product key={item.id} item={item} addToCart={this.addToCart} toggle={Toggler} />
          ))}
        </section>

         <section className="cart"  style={{display: !ChangePage?'block':'none'}}>
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
              placeholder="Enter address"
              onChange=  {(e) => {this.setState({ address: e.target.value })}}
            />
            <input
              type="number"
              placeholder="Enter credit card number"
              onChange={(e) => {this.setState({ creditCard: e.target.value })}}
            />
          </div>

          <button onClick={this.checkout}>Checkout</button>

          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart} />
          ))}
        </section>
      </div>
      </div>
    );
  }
}