import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Services extends Component {
    render() {
        let boolLoggedIn = parseInt(localStorage.getItem('isLoggedIn'));
        return (
            boolLoggedIn === 1 ? <h1> List of services here </h1> : <Redirect to='/' />
        );
    }
}
