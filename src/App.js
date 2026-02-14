import React , {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import {checkAuthState} from './store/actions/auth';
import {connect} from 'react-redux';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import OrderSummary from './components/OrderSummary';
import Profile from './components/Profile';
import wrappedForm from './components/Checkout';
import Products from './components/Products';
import './App.css';
import './villa-bliss-theme.css';


function App(props) {

  useEffect(() => {
    props.onTryAutoSignup();
  }, [props.onTryAutoSignup]);

  return (

    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<wrappedForm />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
