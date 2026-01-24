import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import {authLogin} from '../store/actions/auth';
import {Navigate, NavLink} from 'react-router-dom';

const Login = (props) => {

    const { error, loading, token , login } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let errors = [];
    // console.log(localStorage.getItem("token"));
    // console.log(loading);
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        login(email, password);
    }

    const handleChange = (e) =>{
        if (e.target.name == 'email'){
        setEmail(e.target.value);
        }
        else {
        setPassword(e.target.value);
        }
    }
    
    if(error){
      
      Object.keys(error.response.data).forEach(key=>{
          errors.push(`${key}  : ${error.response.data[key][0]}`);
      })
      console.log(errors);
    }


if(token) {return <Navigate to="/" replace /> }
else{
   return ( 

  <React.Fragment>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center' style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '2.5rem',
        color: '#000000',
        marginBottom: '2rem'
      }}>
        <img src="/images/logo-villa-bliss.jpeg" alt="Villa Bliss" style={{ maxWidth: '150px', marginBottom: '1rem' }} />
        <div>Connexion à votre espace</div>
      </Header>

      {error && errors.map((err, index) =>(<Message negative key={index}>{err}</Message>) )}

      <Form size='large' onSubmit= {handleSubmit} >
        <Segment stacked>
          <Form.Input
           fluid
           name='email'
           icon='mail'
           iconPosition='left'
           placeholder='Adresse email'
           value = {email}
           onChange = {handleChange}
           type='email'
            />
          <Form.Input
            fluid
            name ='password'
            icon='lock'
            iconPosition='left'
            placeholder='Mot de passe'
            type='password'
            value = {password}
            onChange = {handleChange}
          />

          <Button primary fluid size='large' disabled={loading} loading={loading} >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>

          <Button
            color='google plus'
            fluid size='large'
            style={{marginTop: '10px'}}
            onClick={() => window.location.href = 'http://127.0.0.1:8000/accounts/google/login/'}
          >
            <i className="google icon"></i> Se connecter avec Google
          </Button>
        </Segment>
      </Form>
      <Message>
        Nouveau chez Villa Bliss ? <NavLink to='/signup'>Créer un compte</NavLink>
      </Message>
    </Grid.Column>
  </Grid>
  </React.Fragment>
)
}
}

const mapStateToProps = (state) => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        token : state.auth.token
    }
   
}

const mapDispatchToProps = (dispatch)=>{
    return {
        login : (email, password) => dispatch(authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
