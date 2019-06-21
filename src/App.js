import React, { Component } from 'react';
import Product from "./components/Product";
import CartItem from "./components/CartItem";
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mainView: true,
      cardView: true,
      address: "",
      creditCard: "",
      search: "",
      cart: [],
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

  addToCart (item){
    let updatingqtty = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);
    if(index != -1){
       updatingqtty[index].quantity++;
       this.setState(
       {
             cart: updatingqtty
       });
    } else{
       item = Object.assign({}, item, { quantity: 1 });
       this.setState({ cart: [...this.state.cart, item] });
    }
  }

  checkout = () => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
      this.setState({ cart: [] });
      alert('Purchase is complete!');
    } else {
        alert('Please fill out the required fields.');
    }
  };
  handleAddressInput = e => {
    this.setState({ address: e.target.value });
  };
    
    handleCreditCardInput = e => {
      this.setState({ creditCard: e.target.value });
  };

  deleteFromCart(id){
    let deletinggqtty = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === id);
    
    if(deletinggqtty[index].quantity === 1 ){
        deletinggqtty.splice(index, 1);
        this.setState({ cart: deletinggqtty });
    } else if(deletinggqtty[index].quantity > 1 ){
        deletinggqtty[index].quantity--;
        this.setState({ cart: deletinggqtty });
       
    }
  }

  handleToggleView = () => {
    this.setState({ cardView: !this.state.cardView });
  };

  handleSearch(value) {
    this.setState({search: value})
  }
  handlePanel = () => {
    this.setState ({ mainView: !this.state.mainView})
  }

  render() {
    return (
      <div className="App">
      <nav className={this.state.mainView ? "black" : "gray"}>
        <button onClick={() => this.handlePanel()}>Change Panel</button>
      </nav>
      { this.state.mainView ? 
      (
        <section className="products">
          <h1>Products</h1>
            <div className="div">
              <label>Search:</label>
              <input value={this.state.search} onChange={(e) => this.handleSearch(e.target.value)} />
            </div>
            
            <div className="div">
                <button onClick={this.handleToggleView}>Toggle View</button>
            </div>
            
            <h2>Hats</h2>
              {this.state.hats.map(item => {
                if(this.state.search) {
                  if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                    
                    return (
                      <Product key={item.id} item={item} addToCart = {this.addToCart} view = {this.state.cardView}/>
                          )
                  } else {
                    return
                  } 
                }
                  return (
                    <Product key={item.id} item={item} addToCart = {this.addToCart} view = {this.state.cardView}/>
                  )
              })}

            <h2>Beach Gear</h2>
                {this.state.beachGear.map(item =>{
                  if(this.state.search) {
                    if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                        
                      return (
                          <Product key={item.id} item={item} addToCart = {this.addToCart} view = {this.state.cardView}/>
                            )
                    } else {
                      return
                    }
                  }
                    return (
                      <Product key={item.id} item={item} addToCart = {this.addToCart} view = {this.state.cardView}/>
                    )
                })}

          </section>
      )
      :
      (
          <section className="cart">
            <h1>Cart</h1>
              <h2> Total: $
                {this.state.cart.reduce(
                  (totalPrice, product) => (totalPrice += product.price  * product.quantity), 0).toFixed(2)}
              </h2>
              <div className="inputs">
                  <input placeholder="address"
                         value={this.state.address}
                         onChange={this.handleAddressInput} />
                  
                  <input placeholder="credit card number"
                         value={this.state.creditCard}
                         onChange={this.handleCreditCardInput} />
              </div>
              <button onClick={this.checkout}>Checkout</button>
                {this.state.cart.map( item => (
                    <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart} />
                ))}

          </section>

        )};
      </div>
    );
  }
}
