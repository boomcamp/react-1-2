import React, { Component } from 'react';
import Product from './components/Product';
import CartItem from './components/CartItem';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
           cart: [],
           cardView: true,
           address: '',
           creditCard: '',
           Motorcycles: [
               {
                   id: 1,
                   imageUrl: 'https://media.karousell.com/media/photos/products/2018/12/21/2019_yamaha_sniper_available_1545379408_f1ae7b760',
                   title: 'Yamaha Sniper 150',
                   price: 99000,
                   description: 'Gixxer is a comfortable bike with excellent manoeuvrability. The motorcycles large diameter front forks aid in reducing weight and contributes to sporty styling.',
                   quantity: 0,
               },
               {
                   id: 2,
                   imageUrl: 'https://assetscdn1.paytm.com/images/catalog/product/S/SC/SCOSUZUKI-GIXXEJALA2721539BB31AF3/a_4.jpg',
                   title: 'Suzuki Gixxer',
                   price: 90000,
                   description: 'The way the rear design is executed with th e body coloured grab rails almost merging into the panels that pack in a small triangular shaped LED taillight further adds to its looks.',
                   quantity: 0,
               },
               {
                   id: 3,
                   imageUrl: 'https://news.webike.net/wp-content/uploads/2019/04/2019040902_NMAX155_04.jpg',
                   title: 'Honda Xmax',
                   price: 80000,
                   description: 'High-tech features distance the XMAX from your typical bare-bones scooter, including LED lighting and advanced instrumentation. With plenty of lockable onboard storage.',
                   quantity: 0,
               },
           ],

           Headgears: [
               {
                   id: 4,
                   imageUrl: 'https://www.revzilla.com/product_images/0356/8841/icon_airflite_helmet_black_750x750.jpg',
                   title: 'Airflite Helmet',
                   price: 1500,
                   description: 'Its chin vent is functional to flow air and terrify a la a Hannibal Lecter face mask. Intake vents snort in so much fresh air that you can smell pedestrians fear as youre rolling down the block.',
                   quantity: 0,
               },
               {
                   id: 5,
                   imageUrl: 'https://ph-live-01.slatic.net/original/c6aa7e0276f70e29f62170c89a40c8bf.jpg',
                   title: 'RXR Nutshell Helmet Open Face V4',
                   price: 550,
                   description: 'Shock absorbing EPS inner liner for added protection, High-density Foam Fabric (soft and comfortable), Lightweight,',
                   quantity: 0,
               },
           ],
       }
  }

  addToCart = item => {
    this.setState({
      cart: [...this.state.cart, item],
    });
  };

  checkout = () => {
       if (this.state.address.length > 0 && this.state.creditCard.length > 0) {
           this.setState({cart: []});
           alert('Purchase is Complete.')
       } else {
           alert('Please fill out the required fields')
       }
   };

   deleteFromCart = (id) => {
       let cartItem = this.state.cart.map(product => Object.assign({}, product));
       let index = this.state.cart.findIndex(product => product.id == id);

       if (cartItem[index].quantity == 1) {
           cartItem.splice(index, 1);
       } else if (cartItem[index].quantity > 1) {
           cartItem[index].quantity--;
       }
       this.setState({cart: cartItem});
   }

   
   handleToggleView = () => {
       this.setState({ cardView: !this.state.cardView });
   };

   handleAddressInput = e => {
       this.setState({ address: e.target.value });
   };

   handleCreditCardInput = e => {
       this.setState({ creditCard: e.target.value });
   };

  render() {
    return (
      <div className="App">
        <section className="products">
          <h1>Products</h1>
          <h2>Motorcycles</h2>
          {this.state.Motorcycles.map(item => (
            <Product 
                key={item.id} 
                item={item} 
                addToCart={this.addToCart} 
            />
          ))}

          <h2>HeadGears</h2>
          {this.state.Headgears.map(item => (
            <Product 
                key={item.id} 
                item={item} 
                addToCart={this.addToCart} 
            />
          ))}
        </section>

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
              <input type="text" placeholder="Address" value={this.setState.address} onChange={this.handleAddressInput} />

              <input type="text" placeholder="Credit Card Number" value={this.setState.creditCard} onChange={this.handleCreditCardInput} />
          </div>
          <button className="btn-checkout" onClick={this.checkout}>Checkout</button>
          
          {this.state.cart.map(item => (
            <CartItem 
                key={item.id}
                item={item}
                deleteFromCart={this.deleteFromCart}
            />
          ))} 
        </section>
      </div>
    );
  }
}