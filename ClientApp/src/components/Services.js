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
        await fetch('/services/pihole', {
            method: 'POST'
        }).then(res => {
            console.log(res.json())
        });
    }

    render() {
        let boolLoggedIn = parseInt(localStorage.getItem('isLoggedIn'));
        return (
            boolLoggedIn === 1 ?
                <div className='center'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Plex</th>
                                <td>Check mark here</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <td>Check mark here</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>Grafana</th>
                                <td>Check mark here</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>PiHole</th>
                                <td>Check mark here</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                : <Redirect to='/' />
        );
    }
}
