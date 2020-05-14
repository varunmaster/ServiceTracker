import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './services.css';

export class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getServiceStatus();
    }

    async getServiceStatus() {
        const res = await fetch('getservicestatus');
        const data = await res.json();
        console.log(data);
    }

    render() {
        let boolLoggedIn = parseInt(localStorage.getItem('isLoggedIn'));
        return (
            boolLoggedIn === 1 ?
                <div className='center'>
                    <table>
                        <tr>
                            <th>Plex</th>
                            <td>Check mark here</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>Check mark here</td>
                        </tr>
                        <tr>
                            <th>Grafana</th>
                            <td>Check mark here</td>
                        </tr>
                        <tr>
                            <th>PiHole</th>
                            <td>Check mark here</td>
                        </tr>
                    </table>
                </div>
                : <Redirect to='/' />
        );
    }
}
