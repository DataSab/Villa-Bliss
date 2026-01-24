import React, { useState, useEffect } from 'react'
import {Menu, Container, Grid, Dimmer, Loader, Image, Message, Header, Segment, Card, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { productListURL} from '../constants';


function Ressources() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [ressources, setRessources] = useState([]);
    const [filteredRessources, setFilteredRessources] = useState([]);

    useEffect(() => {
        fetchRessources();
    }, [])

    useEffect(() => {
        filterRessources();
    }, [activeCategory, ressources])

    const fetchRessources = () => {
        setLoading(true);
        axios.get(productListURL).then(res => {
            setRessources(res.data);
            setFilteredRessources(res.data);
            setLoading(false);
        }).catch(error => {
            console.error('Erreur chargement ressources:', error);
            setError('Impossible de charger les ressources');
            setLoading(false);
        })
    }

    const filterRessources = () => {
        if (activeCategory === 'all') {
            setFilteredRessources(ressources);
        } else {
            const filtered = ressources.filter(r =>
                r.category && r.category.toLowerCase().includes(activeCategory.toLowerCase())
            );
            setFilteredRessources(filtered);
        }
    }

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    }

    const getCategoryIcon = (category) => {
        const icons = {
            'huiles': 'leaf',
            'meditation': 'sun outline',
            'tisanes': 'coffee',
            'yoga': 'heartbeat',
            'aromatherapie': 'magic',
            'naturopathie': 'tree'
        };
        return icons[category] || 'book';
    }

    const renderRessources = () => {
        return (
            <React.Fragment>
                <Card.Group itemsPerRow={2} stackable style={{'marginTop' : '20px'}}>

                {filteredRessources && filteredRessources.length > 0 ? filteredRessources.map(ressource => (
                    <Card key={ressource.id} as={Link} to={`/product/${ressource.id}`}>
                        <Image src={ressource.image || '/images/default-resource.jpg'} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontSize: '1.5rem',
                                color: '#000000'
                            }}>
                                {ressource.title}
                            </Card.Header>
                            <Card.Meta style={{
                                color: '#8B6914',
                                fontWeight: 600,
                                marginTop: '0.5rem'
                            }}>
                                <Icon name={getCategoryIcon(activeCategory)} />
                                {ressource.category}
                            </Card.Meta>
                            <Card.Description style={{
                                marginTop: '1rem',
                                color: '#2d2d2d'
                            }}>
                                {ressource.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='download' />
                            Télécharger la ressource
                        </Card.Content>
                    </Card>
                )) : (
                    <Segment placeholder textAlign='center' style={{ width: '100%', padding: '3rem' }}>
                        <Header icon style={{ color: '#8B6914' }}>
                            <Icon name='search' style={{ color: '#8B6914' }} />
                            Aucune ressource dans cette catégorie
                        </Header>
                        <p style={{ fontSize: '1.1rem', color: '#2d2d2d' }}>
                            Les guides arrivent bientôt. Revenez nous voir prochainement !
                        </p>
                    </Segment>
                )}
                </Card.Group>
            </React.Fragment>
        )
    }


    return (
        <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Header as='h1' textAlign='center' style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '3rem',
                background: 'linear-gradient(135deg, #D97F3D 0%, #F5A855 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
            }}>
                Nos Ressources Bien-Être
            </Header>
            <p style={{
                textAlign: 'center',
                fontSize: '1.2rem',
                color: '#2d2d2d',
                marginBottom: '3rem',
                maxWidth: '700px',
                margin: '0 auto 3rem auto'
            }}>
                Explorez nos guides et fiches pratiques pour un bien-être naturel au quotidien
            </p>

            <Grid container divided columns={2} >
                <Grid.Row columns={1}>
                    <Grid.Column>
                    {error && (
                        <Message negative>
                            <Message.Header>Une erreur est survenue</Message.Header>
                            <p>{error}</p>
                        </Message>
                    )}

                    {loading && (
                        <Segment>
                            <Dimmer active inverted>
                                <Loader size='large'>Chargement des ressources...</Loader>
                            </Dimmer>
                            <Image src="/images/wireframe/short-paragraph.png" />
                        </Segment>
                    )}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={5}>
                        <Header as='h3' style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            color: '#000000',
                            marginBottom: '1.5rem'
                        }}>
                            <Icon name='filter' style={{ color: '#D97F3D' }} />
                            Catégories
                        </Header>
                        <Menu pointing vertical fluid>
                            <Menu.Item
                                name="Toutes les ressources"
                                active={activeCategory === 'all'}
                                onClick={() => handleCategoryClick('all')}
                                style={{
                                    fontWeight: activeCategory === 'all' ? 600 : 400
                                }}
                            >
                                <Icon name='grid layout' />
                                Toutes les ressources
                            </Menu.Item>
                            <Menu.Item
                                name='Huiles Essentielles'
                                active={activeCategory === 'huiles'}
                                onClick={() => handleCategoryClick('huiles')}
                                style={{
                                    fontWeight: activeCategory === 'huiles' ? 600 : 400
                                }}
                            >
                                <Icon name='leaf' />
                                Huiles Essentielles
                            </Menu.Item>
                            <Menu.Item
                                name='Méditation'
                                active={activeCategory === 'meditation'}
                                onClick={() => handleCategoryClick('meditation')}
                                style={{
                                    fontWeight: activeCategory === 'meditation' ? 600 : 400
                                }}
                            >
                                <Icon name='sun outline' />
                                Méditation
                            </Menu.Item>
                            <Menu.Item
                                name="Tisanes & Infusions"
                                active={activeCategory === 'tisanes'}
                                onClick={() => handleCategoryClick('tisanes')}
                                style={{
                                    fontWeight: activeCategory === 'tisanes' ? 600 : 400
                                }}
                            >
                                <Icon name='coffee' />
                                Tisanes & Infusions
                            </Menu.Item>
                            <Menu.Item
                                name="Yoga"
                                active={activeCategory === 'yoga'}
                                onClick={() => handleCategoryClick('yoga')}
                                style={{
                                    fontWeight: activeCategory === 'yoga' ? 600 : 400
                                }}
                            >
                                <Icon name='heartbeat' />
                                Yoga
                            </Menu.Item>
                            <Menu.Item
                                name="Aromathérapie"
                                active={activeCategory === 'aromatherapie'}
                                onClick={() => handleCategoryClick('aromatherapie')}
                                style={{
                                    fontWeight: activeCategory === 'aromatherapie' ? 600 : 400
                                }}
                            >
                                <Icon name='magic' />
                                Aromathérapie
                            </Menu.Item>
                            <Menu.Item
                                name="Naturopathie"
                                active={activeCategory === 'naturopathie'}
                                onClick={() => handleCategoryClick('naturopathie')}
                                style={{
                                    fontWeight: activeCategory === 'naturopathie' ? 600 : 400
                                }}
                            >
                                <Icon name='tree' />
                                Naturopathie
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={11}>
                        {renderRessources()}
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps)(Ressources)
