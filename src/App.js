import React, { Component } from 'react';
import './App.css';
export default class App extends Component {

    constructor() {
      super();
      this.state = {
        
        shirt: [
          {
            id: 1,
            imageUrl: 'https://via.placeholder.com/150x150',
            title: 'Titan',
            price: 12.99,
            description: 'dipisicing elit. Quasi libero nemo dolorem soluta laborum, sequi natus quisquam consequuntur, iusto repellendus ab ',
            quantity: 0 ,

          },
          {
            id: 2,
            imageUrl: 'https://via.placeholder.com/150x150',
            title: 'asdfsdfasdfsadfsa',
            price: 12.99,
            description: 'has a feather in it.',
            quantity: 0 ,
            
          },
          {
            id: 3,
            imageUrl: 'https://via.placeholder.com/150x150',
            title: 'asd',
            price: 12.99,
            description: 'has a feather in it.',
            quantity: 0 ,
            
          },
         
          
          

        ],
        hats: [
          {
            id: 1,
            title: "Fisherman's Hat",
            description:
              'Headgear commonly used by fishermen. Increases fishing skill marginally.',
            price: 12.99,
            imageUrl: 'https://via.placeholder.com/150x150',
            quantity: 0 ,
            
          },
          {
            id: 2,
            title: 'Metal Hat',
            description: 'Uncomfortable, but sturdy.',
            price: 8.99,
            imageUrl: 'https://via.placeholder.com/150x150',
            quantity: 0 ,
            
          },
        ],

        cart: [],
        address: '',
        creditCard: '',
        cardView: false,
      };
    }

   
    addToCart(item) {
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
      if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
        this.setState({ cart: [] });
        alert('Purchase is complete!');
      } else {
        alert('Please fill out the required fields.');
      }
    }

    handleAddressInput = (e) => {
      this.setState({address: e.target.value})
    
    }
  
    handleCreditCardInput = (e) => {
      this.setState({ creditCard: e.target.value });
    }
   
    handleToggle = () =>{
      this.setState({ cardView: !this.state.cardView });
      console.log(this.state.cardView);
    }
    render(){
      
      

      return (
        <div className="App">
          
          <section className="products" >
            <h4 className="section-title no-margin">Products</h4>
            <br/>
            <button onClick={this.handleToggle}>Toggle View</button>
      
            <h4 className="section-title">T-shirts</h4>
            {
              this.state.shirt.map( element => (
                <div key={element.id} className={this.state.cardView ? "product" : " product flexed"}>
                  <img src={element.imageUrl} />
                  <div className="product-description">
                    <h4>{element.title}</h4>
                    <br/>  
                    <p>{element.description}</p>
                    <p>$ {element.price}</p>

                    <button onClick={() => this.addToCart(element)}>Add to Cart</button>
                  </div>
                </div>
              ))
            }
            <h4 className="section-title">Hats</h4>
            {
              this.state.hats.map( element => (
                <div key={element.id}  className={this.state.cardView ? "product" : " product flexed"}>
                  <img src={element.imageUrl} />
                  <div className="product-description">
                    <h4>{element.title}</h4>
                    <br/>  
                    <p>{element.description}</p>
                    <p>$ {element.price}</p>

                    <button onClick={() => this.addToCart(element)}>Add to Cart</button>
                  </div>
                </div>
              ))
            }
         
          </section>
          <section className="cart">
            <h4 className="section-title no-margin white-color">Cart</h4>
            <br/>
            <div className="inputs">
            <input
              placeholder="address"
              value={this.state.address}
              onChange={this.handleAddressInput}
            />
            <input
              placeholder="credit card number"
              onChange={this.handleCreditCardInput}
            />
          </div>
            <h4 className="section-title white-color">
              Total : $
             
              {this.state.cart.reduce( (totalPrice , item) => ( 
                totalPrice += item.price
                ) , 0)}
            </h4>
           
            <button className="section-title" onClick={this.checkout}>Checkout</button>
            <br/><br/>
            <div className="cart-item-container">
            {
              this.state.cart.map( element => (
                <div key={element.id} className="cart-item">
                  <img src={element.imageUrl} />
                  <div className="cart-description">
                    <h4>{element.title} </h4>
                    <br/>
                    <p>{element.description}</p>
                    <br/>
                    <p>$ {element.price} | <b>Quantity</b> : {element.quantity}</p>
                    <button onClick={() => this.deleteFromCart(element.id)}>
                      Remove from Cart
                    </button>
                    {/* <button onClick={() => this.addToCart(element)}>Add to Cart</button> */}
                  </div>
                </div>

              ))
            }
            </div>

          </section>
        </div>
      );
     
    }

}