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
      searchText: '',
      view: true,
      viewBtnTitle: 'View Cart',
      address: '',
      creditCard: '',
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

    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.handleToggleView = this.handleToggleView.bind(this);
    this.saveText = this.saveText.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.handleCreditCardInput = this.handleCreditCardInput.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  addToCart(item) {
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if (index === -1) {
      item = Object.assign({}, item, { quantity: 1});
      this.setState({ cart: [...this.state.cart, item] });
    } else {
      cartCopy[index].quantity++;
      this.setState({ cart: cartCopy });
    }
  }

  checkout(){
    if(this.state.address && this.state.creditCard){
        this.setState({ cart: [] });
        alert("Purchase is complete!");
        this.setState({ address: ''});
        this.setState({ creditCard: ''});
    }
    else{
        alert("Please fill out the required fields!");
    }
    
}

  deleteFromCart(item){
    let cartCopy = this.state.cart.map(product => Object.assign({}, product));
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if (this.state.cart[index].quantity > 1) {
        cartCopy[index].quantity--;
        this.setState({ cart: cartCopy });
    } else if(this.state.cart[index].quantity === 1) {
      cartCopy.splice(index, 1);
      this.setState({ cart: cartCopy });
    }
}

  handleToggleView(){
    if(this.state.cardView === true){
        this.setState({ cardView: false});
    }
    else{
        this.setState({ cardView: true});
    }
    console.log(this.state.cardView);
  }

  saveText(e){
    this.setState({ searchText: e })
  }

  changeView(){
    if(this.state.view === true){
      this.setState({
        view: false,
        viewBtnTitle: 'View Products',
      })
    }
    else{
      this.setState({
        view: true,
        viewBtnTitle: 'View Cart',
      })
    }
  }

  handleAddressInput(event){
    this.setState({address: event});
  }

  handleCreditCardInput(event){
      this.setState({creditCard: event})
  }

  render() {
    return (
      <React.Fragment>
      <div className="toggleView"><button onClick={() => this.changeView()}>{this.state.viewBtnTitle}</button></div>
      <div className="App">

        {
          this.state.view ? 
          
          <section className="products">
          <h1>Products</h1>
          <input value={this.state.searchText} onChange={e => this.saveText(e.target.value)}></input><br /><br />
          <button onClick={this.handleToggleView}>Toggle View</button>

          <h2>Hats</h2>
          <Product products={this.state.hats} addToCart={this.addToCart} cardView={this.state.cardView} setText={this.state.searchText}/>

          <h2>Beach Gear</h2>
          <Product products={this.state.beachGear} addToCart={this.addToCart} cardView={this.state.cardView} setText={this.state.searchText}/>

          </section> : 
          
          <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart.reduce(
              (totalPrice, product) => (totalPrice += product.price * product.quantity),
              0
            )}
          </h2>
          <div className="inputs">
                    <input type="text" placeholder="Address" value={this.state.address} onChange={e => this.handleAddressInput(e.target.value)}></input>
                    <input type="text" placeholder="Credit Card" value={this.state.creditCard} onChange={e => this.handleCreditCardInput(e.target.value)}></input>
          </div><br />
          <button onClick={this.checkout}>Checkout</button>
          
          <CartItem items={this.state.cart} deleteFromCart={this.deleteFromCart}/>

        </section>

        }
        
      </div>
      </React.Fragment>
    );
  }
}
