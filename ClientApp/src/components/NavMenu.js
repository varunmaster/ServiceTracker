import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleSignOut() {
        localStorage.removeItem('isLoggedIn');
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">ServiceTracker</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                &nbsp;
                                &nbsp;
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                &nbsp;
                                &nbsp;
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                &nbsp;
                                &nbsp;
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/services">Services</NavLink>
                                </NavItem>
                                &nbsp;
                                &nbsp;
                                <NavItem>
                                    <Button color="info" size="sm"><NavLink tag={Link} className="text-dark" to="/login">Login</NavLink></Button>
                                </NavItem>
                                &nbsp;
                                &nbsp;
                                <NavItem>
                                    <Button color="danger" size="sm" onClick={this.handleSignOut}><NavLink tag={Link} className="text-dark">Sign Out</NavLink></Button>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
