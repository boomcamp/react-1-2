import React, { Component } from 'react';
import Product from "./components/Product";
import CartItem from "./components/CartItem";
import './App.css';

//
export default class App extends Component {
    constructor(){
        super();
        this.state = {
            cart: [],
            cats: [
                {
                  id: 1,
                  title: "Bruce",
                  description:
                    'Nice Companion for those who travel.',
                  price: 12.99,
                  imageUrl: 'http://placekitten.com/200/300',
                  toggleView: false,
                },
                {
                  id: 2,
                  title: 'Tamoola',
                  description: 'A little grumpy, but cute.',
                  price: 18.99,
                  imageUrl: 'http://placekitten.com/200/301',
                  toggleView: false,
                },
                {
                    id: 3,
                    title: 'Big Boi',
                    description: 'Your bright friend who eats your fries.',
                    price: 83.99,
                    imageUrl: 'http://placekitten.com/200/322',
                    toggleView: false,
                  },
              ],
              dogs: [
                {
                  id: 1,
                  title: "Cookie",
                  description:
                    'A party pooper but great for long walks.',
                  price: 12.99,
                  imageUrl: 'https://placedog.net/500?id=5',
                  toggleView: false,
                },
                {
                  id: 2,
                  title: 'Sausage',
                  description: 'Loves eating sandals.',
                  price: 18.99,
                  imageUrl: 'https://placedog.net/501?id=12',
                  toggleView: false,
                },
                {
                    id: 3,
                    title: 'Akon',
                    description: 'will dig at your backyard for bones.',
                    price: 83.99,
                    imageUrl: 'https://placedog.net/502?id=3',
                    toggleView: false,
                  },
              ],
              
              address: '',
              creditCard: '',
        };
    }

    addToCart = (item) => {
        this.setState({
          cart: [...this.state.cart, item],
        });
      }
    
      emptyCart() {
        this.setState({
          cart: [],
          address: '',
          creditCard: '',
        });
      }
    
    switchView = () =>{
      //namesarr = namesarr.concat(nums.map
      const x = this.state.cart.forEach(e => {
      e.toggleView = !e.toggleView;
      return this.state.cart 
        console.log(e.id + ' ' +  e.toggleView)
        
      })
      console.log (x)
        // this.setState({
        //   cart: x
        //   })
          
            
         
        //console.log(this.state.cart) 
    }

   handleAddressInput = e => {
    this.setState({ address: e.target.value });
    };

    handleCreditCardInput = e => {
    this.setState({ creditCard: e.target.value });
    };
    render(){
        return(
            <div className="App">
                 <section className="products" >
                    <h1>Products</h1>
                    <button onClick={() => this.switchView()}>Switch View</button>
                    <h2>Cats</h2>
                    {this.state.cats.map(item => (
                        <Product key = {item.id} item = {item} addToCart = {this.addToCart} />

                    ))}
                    <h2>Dogs</h2>
                    {this.state.dogs.map(item => (
                       <Product key = {item.id} item = {item} addToCart = {this.addToCart} />
                    ))}
                </section>

                <section className="cart">
                    <h1>Cart</h1>
                    <h2> Total: ${this.state.cart.reduce((totalPrice, product) => (totalPrice += product.price),0)}
                    </h2>
                    <div>
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
                    <button onClick={() => {
                        if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
                            alert('Purchase is complete!');
                            this.emptyCart();
                          } else {
                            alert('Please fill out the required fields.');
                          }
                        }}>Checkout</button>
                    {this.state.cart.map(item => (
                        <CartItem  key={item.id} item={item} />
                    ))}
                </section>
            </div>
        )
    }
}
