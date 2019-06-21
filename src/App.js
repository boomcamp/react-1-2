import React, { Component } from "react";
import Product from './components/Product';
import CartItem from './components/CartItem';
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cardView: true,
      mainView: true,
      emptyCart: true,
      cart: [],
      address: "",
      creditCard: "",
      search: "",
      hats: [
        {
          id: 1,
          title: "Fisherman's Hat",
          description:
            "Headgear commonly used by fishermen. Increases fishing skill marginally.",
          price: 12.99,
          imageUrl: "data:image/jpeg;base64,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",
          quantity: 0
        },
        {
          id: 2,
          title: "Metal Hat",
          description: "Uncomfortable, but sturdy.",
          price: 8.99,
          imageUrl: "https://cdn.shopify.com/s/files/1/2292/5767/products/SKULLALUIM_480x480.jpeg?v=1513790081",
          quantity: 0
        }
      ],
      beachGear: [
        {
          id: 3,
          title: "Tent",
          description: "Portable shelter.",
          price: 32.99,
          imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61KOQIyKJgL._SX425_.jpg",
          quantity: 0
        }
      ]
    };

    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  handleSearch(value) {
    this.setState({search: value})
  }

  addToCart(item) {
    let cartCopy = this.state.cart;
    let index = this.state.cart.findIndex(product => product.id === item.id);

    if (index === -1) {
      item.quantity++;
      this.setState({ cart: [...this.state.cart, item] });
    } else {
      cartCopy[index].quantity++;
      this.setState({ cart: cartCopy });
    }

    this.setState({ emptyCart: false });
  }

  deleteFromCart(id) {
    let cartCopy = this.state.cart;
    let index = this.state.cart.findIndex(product => product.id === id);

    if (cartCopy[index].quantity === 1) {
      cartCopy.splice(index, 1);
    } else if (cartCopy[index].quantity > 1) {
      cartCopy[index].quantity--;
    }

    this.setState({ cart: cartCopy });
  
    if(cartCopy.length===0){
      this.setState({ emptyCart: false });
    }
  }

  checkout = msg => {
    if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
      this.setState({ cart: [] });
      this.setState({ cardView: true });
      this.setState({ mainView: true });
      this.setState({ emptyCart: true });
      alert('Purchase is complete!');
    }else{
      alert('Please fill out the required fields.');
    }
  };

  cancelCart = msg => {
    this.setState({ cart: [] });
    this.setState({ cardView: true });
    this.setState({ mainView: true });
    this.setState({ emptyCart: true });
    alert('Cart Cancelled!');
  }

  handleAddressInput = e => {
    this.setState({ address: e.target.value });
  };

  handleCreditCardInput = e => {
    this.setState({ creditCard: e.target.value });
  };

  handleToggleView = () => {
    this.setState({ cardView: !this.state.cardView });
  };

  handleTogglePage = () => {
    this.setState({ mainView: !this.state.mainView });
  };

  render() {
    return (
      <div className="App">
        <nav className={this.state.mainView ? "black" : "white"}>
          <button onClick={() => this.handleTogglePage()}>Change Page</button>
        </nav>
        { this.state.mainView ? (
        <section className="products">
          <h1>Products</h1>
          <label>Search:
            <input 
              value={this.state.search} 
              onChange={(e) => this.handleSearch(e.target.value)} />
          </label>
          <br/>
          <button onClick={this.handleToggleView}>Toggle View</button>
          <h2>Hats</h2>
          {this.state.hats.map(item => {
              if(this.state.search) {
                if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                  return (
                    <Product 
                      key={item.id} 
                      item={item} 
                      addToCart={this.addToCart} 
                      view={this.state.cardView}/>
                  )
                } else {
                  return
                }
              }else{
                return (
                  <Product 
                    key={item.id} 
                    item={item} 
                    addToCart={this.addToCart} 
                    view={this.state.cardView}/>
                )
              }
            })
          }

          <h2>Beach Gear</h2>

          {this.state.beachGear.map(item => {
              if(this.state.search) {
                if(item.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                  return (
                    <Product 
                      key={item.id} 
                      item={item} 
                      addToCart={this.addToCart} 
                      view={this.state.cardView}/>
                  )
                } else {
                  return
                }
              }else{
                return (
                  <Product 
                  key={item.id} 
                  item={item} 
                  addToCart={this.addToCart} 
                  view={this.state.cardView}/>
                )
              }
            })
          }
        </section> )
        :
        (
        <section className="cart">
          <h1>Cart</h1>
          <h2>
            Total: $
            {this.state.cart
              .reduce(
                (totalPrice, product) =>
                  (totalPrice += product.price * product.quantity),0
              ).toFixed(2)}
          </h2>

          <div className="inputs">
            <input
              placeholder="address"
              value={this.state.address}
              onChange={this.handleAddressInput}
            />
            <input
              placeholder="credit card number"
              value={this.state.creditCard}
              onChange={this.handleCreditCardInput}
            />
          </div>

          <button className="checkOut" 
            onClick={() => this.checkout()}
            disabled={this.state.emptyCart}
            >Checkout</button>
          <button className="cancel" 
            onClick={() => this.cancelCart()}
            disabled={this.state.emptyCart}
            >Cancel Cart</button>

          {this.state.cart.map(item => (
            <CartItem key={item.id} item={item} deleteFromCart={this.deleteFromCart}/>
          ))}
        </section>
        ) }
      </div>
    );
  }
}