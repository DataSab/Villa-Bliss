import React, { useEffect } from 'react'
import { Menu, Container, Dropdown, DropdownDivider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import {logout} from '../store/actions/auth';
import {fetchCart} from '../store/actions/cart';

function Navbar(props) {
    const {authenticated, logout, fetchCart, cart} = props;
    useEffect(()=>{
        fetchCart();
    },[]);

    return (

        <Menu>
        <Container>
            <Link to="/">
            <Menu.Item header name='Accueil'/>
            </Link>

            <Link to="/products">
            <Menu.Item header name='Ressources'/>
            </Link>

        { authenticated ?(
            <React.Fragment>
            <Menu.Menu position="right">
            <Link to="/profile">
            <Menu.Item position="right" name='Mon Profil'/>
            </Link>

            <Menu.Item header onClick={logout} name="Déconnexion" style={{cursor : 'pointer'}} position="right" />

            </Menu.Menu>
        </React.Fragment>

        ) : (
            <Menu.Menu position="right">
                <Link to="/login">
                  <Menu.Item header>Connexion</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Inscription</Menu.Item>
                </Link>
              </Menu.Menu>
        )}
        </Container>
      </Menu>

    )
}

const mapStateToProps = (state) => {
    return {
        authenticated : state.auth.token !== null,
        cart : state.cart.cart
    }
   
}

const mapDispatchToProps = (dispatch)=>{
    return {
       logout : ()=>dispatch(logout()),
       fetchCart : () => dispatch(fetchCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
