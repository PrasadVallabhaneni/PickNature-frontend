import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';
import {Container} from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage';
import LoginPage from "./pages/LoginPage";
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from "./pages/OrderPage";
function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Container>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/product/:id" component={ProductsPage} />
          <Route exact path="/cart/:id?" component={CartPage} />
        </Container>
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/shipping" component={ShippingPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/placeorder" component={PlaceOrderPage} />
        <Route exact path="/order/:id" component={OrderPage} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
