import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../actions/userActions';
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();

    const login = useSelector(state => state.login);

    const { userInfo } = login

    return (
        <header className="mb-3">
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>E Shop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>Cart</Nav.Link>
                            </LinkContainer>

                            {!userInfo ? (<LinkContainer to="/login">
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>) : (
                                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                        <LinkContainer to="/profile/1">
                                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={() => dispatch(logoutAction())} >Logout</NavDropdown.Item>

                                    </NavDropdown>
                                )}

                            {(userInfo && userInfo.isAdmin) && (
                                <NavDropdown title="Admin" id="basic-nav-dropdown2">
                                    <LinkContainer to="/admin/users/1">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/products/1">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orders/1">
                                        <NavDropdown.Item >Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
