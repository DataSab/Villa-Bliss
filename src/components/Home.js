/* eslint-disable no-unused-vars */
import React, { useState , useEffect} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {productListURL} from '../constants';
import { Container, Message, Segment , Item, Dimmer, Loader, Image, Button, Icon, Label, Header} from 'semantic-ui-react';
import {authAxios} from '../utils';
import { Link } from 'react-router-dom';

function Home(props) {
    const [ressources, setRessources] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(productListURL).then(res => {
            setRessources(res.data);
            setLoading(false);
        }).catch(error =>{
            console.error('Erreur chargement ressources:', error);
            setLoading(false);
        });

    }, []);

    
    return (
        <Container style={{ 'marginTop' : '50px'}}>
            <img src="/images/logo-villa-bliss.jpeg" alt="Villa Bliss Logo" className="logo-villa-bliss" />

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Header as='h1' style={{
                    fontSize: '3.5rem',
                    background: 'linear-gradient(135deg, #D97F3D 0%, #F5A855 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    Bienvenue chez Villa Bliss
                </Header>
                <Header as='h3' style={{
                    color: '#8B6914',
                    fontWeight: 400,
                    fontSize: '1.4rem',
                    fontFamily: 'Montserrat, sans-serif',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.8'
                }}>
                    Votre sanctuaire numérique dédié au bien-être naturel, à la méditation et à l'harmonie intérieure
                </Header>
            </div>

            {loading && (
                <Segment>
                    <Dimmer active inverted>
                     <Loader size='large'>Chargement des ressources...</Loader>
                   </Dimmer>
                <Image src="/images/wireframe/short-paragraph.png" />
                </Segment>
            )}

        {ressources.length === 0 && !loading ? (
            <Segment placeholder textAlign='center' style={{ padding: '4rem' }}>
                <Header icon style={{ color: '#8B6914' }}>
                    <Icon name='leaf' style={{ color: '#8B6914' }} />
                    Ressources en préparation
                </Header>
                <p style={{ fontSize: '1.1rem', color: '#2d2d2d' }}>
                    Nos guides sur les huiles essentielles, la méditation et les tisanes arrivent bientôt.
                    <br />Revenez nous voir très prochainement !
                </p>
            </Segment>
        ) : (
            <Item.Group divided>
            { ressources.map(ressource => {
                return(
                    <Item key={ressource.id} >
                    <Item.Image size='small' src={ressource.image} />

                    <Item.Content>
                    <Link to={`/product/${ressource.id}`}><Item.Header>{ressource.title}</Item.Header></Link>
                    <Item.Meta>
                        <span>{ressource.category}</span>
                    </Item.Meta>
                    <Item.Description>
                       <p>{ressource.description}</p>
                      </Item.Description>
                      <Item.Extra>
                        <Button primary as={Link} to={`/product/${ressource.id}`}>
                            Découvrir
                            <Icon name='arrow right' />
                        </Button>

                        { ressource.label && (
                        <Label color={
                            ressource.label === 'primary' ? 'blue' :
                            ressource.label === 'secondary' ? 'yellow' : 'olive'
                        }>
                            {ressource.label === 'primary' ? 'Populaire' :
                             ressource.label === 'secondary' ? 'Nouveau' : 'Recommandé'}
                        </Label>
                        )}

                        </Item.Extra>

                    </Item.Content>
                  </Item>
                )
            }) }

          </Item.Group>
        )}
      </Container>
    )
    
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
