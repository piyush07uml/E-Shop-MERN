import React from 'react';
import './bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderDetailsScreen from './Screens/OrderDetailsScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import OrdersAdminScreen from './Screens/OrdersAdminScreen';
import UsersAdminScreen from './Screens/UsersAdminScreen';
import UserUpdateAdminScreen from './Screens/UserUpdateAdminScreen';
import ProductsAdminScreen from './Screens/ProductsAdminScreen';
import ProductEditScreen from './Screens/ProductEditScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/keywords/:keywords" component={HomeScreen} />
          <Route exact path="/keywords/:keywords/page/:page" component={HomeScreen} />
          <Route exact path="/page/:page" component={HomeScreen} />
          <Route exact path="/productDetails/:id" component={ProductDetailsScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/shippingAddress" component={ShippingAddressScreen} />
          <Route exact path="/profile/:page" component={UserProfileScreen} />
          <Route exact path="/paymentMethod" component={PaymentMethodScreen} />
          <Route exact path="/createOrder" component={PlaceOrderScreen} />
          <Route exact path="/orderDetails/:id" component={OrderDetailsScreen} />
          <Route exact path="/admin/orders/:page" component={OrdersAdminScreen} />
          <Route exact path="/admin/users/:page" component={UsersAdminScreen} />
          <Route exact path="/admin/userUpdate/:id" component={UserUpdateAdminScreen} />
          <Route exact path="/admin/products/:page" component={ProductsAdminScreen} />
          <Route exact path="/admin/product/edit/:id" component={ProductEditScreen} />

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
