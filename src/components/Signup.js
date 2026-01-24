import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux';
import {authSignup} from '../store/actions/auth';
import {Navigate, NavLink} from 'react-router-dom';

const Signup = (props) => {

    const { error, loading, token , signup } = props;
    let errors = [];
    const [user, setUser] = useState({username : '', password1 : '', password2:'', email : ''});    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        signup(user.username,user.email, user.password1, user.password2);
    }

    if(error){
      
      Object.keys(error.response.data).forEach(key=>{
          errors.push(`${key}  : ${error.response.data[key][0]}`);
      })
      console.log(errors);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser((prevState)=> ({
            ...prevState,
            [name] : value
        }));
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
        <div>Créer votre compte</div>
      </Header>

      {error && errors.map((err, index) =>(<Message negative key={index}>{err}</Message>) )}

      <Form size='large' onSubmit= {handleSubmit} >
        <Segment stacked>
          <Form.Input
           fluid
           name='username'
           icon='user'
           iconPosition='left'
           placeholder="Nom d'utilisateur"
           value = {user.username}
           onChange = {handleChange}
            />

          <Form.Input
            fluid
            name ='email'
            icon='mail'
            iconPosition='left'
            placeholder='Adresse email'
            type='email'
            value = {user.email}
            onChange = {handleChange}
          />

          <Form.Input
            fluid
            name ='password1'
            icon='lock'
            iconPosition='left'
            placeholder='Mot de passe'
            type='password'
            value = {user.password1}
            onChange = {handleChange}
          />

          <Form.Input
           fluid
           name='password2'
           icon='lock'
           iconPosition='left'
           type="password"
           placeholder='Confirmer le mot de passe'
           value = {user.password2}
           onChange = {handleChange}
            />

          <Button primary fluid size='large' disabled={loading} loading={loading} >
            {loading ? 'Création...' : "S'inscrire"}
          </Button>
        </Segment>
      </Form>
      <Message>
        Vous avez déjà un compte ? <NavLink to='/login'>Se connecter</NavLink>
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
        signup : (username,email, password1, password2) => dispatch(authSignup(username,email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
